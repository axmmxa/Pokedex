
// globale Variables
let i

let amountOfPoke = 20

let allPokemon =[]
let allPokemonSpecial =[]

// Main Data

let color = []

//Poke Card Dta 
let hp
let attack
let defense
let specialAttack
let specialDefense
let speed



// Load and process API Data

async function loadPokemon() {

    for(i=1; i<amountOfPoke; i++) {

        let url = `https://pokeapi.co/api/v2/pokemon/${i}`
        let response = await fetch(url)
        let currentPokemon = await response.json()

        allPokemon.push(currentPokemon)

        
        let urlSpecial = `https://pokeapi.co/api/v2/pokemon-species/${i}`
        let responseSpecial = await fetch(urlSpecial)
        let currentPokemonSpecial = await responseSpecial.json()


        allPokemonSpecial.push(currentPokemonSpecial)


    }
}
     
     

// Pokemon Card Data 


function cardData(i) {

         hp = allPokemon[i]['stats']['0']['base_stat']
         attack = allPokemon[i]['stats']['1']['base_stat']
         defense = allPokemon[i]['stats']['2']['base_stat']
         specialAttack = allPokemon[i]['stats']['3']['base_stat']
         specialDefense = allPokemon[i]['stats']['4']['base_stat']
         speed = allPokemon[i]['stats']['5']['base_stat']

         console.log(attack)
}


function setColorMain(i) {
    
    

    let mainContainer = document.getElementById(`main-container-${i}`)
    mainContainer.classList.add('main-container')
    mainContainer.classList.add('main-container:hover')

    currentColor = allPokemonSpecial[i]['color']['name']
    mainContainer.style.backgroundColor = `${currentColor}`

}

function setColorCard(i) {
    console.log(i)
    let cardMainInfo = document.getElementById(`card-main-info`)
    cardMainInfo.classList.add('card-main-info')

    currentColor = allPokemonSpecial[i]['color']['name']
    cardMainInfo.style.backgroundColor = `${currentColor}`
    
    
}

// search for Pokemon 

function searchPoke() {

    for (i=0; i<amountOfPoke - 1; i++) {

        let currentName = (allPokemon[i]['name'])
        

        let search = document.getElementById('input').value
        search = search.toLowerCase()
        

        if (currentName == search) {
            openCard(i)
        }
    }
    
    
    
    
    
}

// open Pokemon Card

async function openCard(i) {

    await cardData(i)

    document.getElementById('content').innerHTML = ''
    document.getElementById('more-poke')= ''

    document.getElementById('content').innerHTML += `


        <div id="poke-card">

            <div id="card-main-info">

                <div id="headline-info">
                    <button id="close-button" onclick="closeCard(${i})">x</button>
                    <h1>${allPokemon[i]['name']}</h1>
                    <h1>#${i+1}</h1>
                </div>

                <div class="main-info">
                    <button class="move-button" id="backwards-button" onclick="backward(${i})"><img src="img/media-skip-backward-24.png"></button>
                    <img src="${allPokemon[i]['sprites']['other']['dream_world']['front_default']}">
                    <button class="move-button" id="forward-button" onclick="forward(${i})"><img src="img/media-skip-forward-24.png"></button>
                    
                    

                    
                </div>
                

            </div>
            
            <div id="poke-more-info">

            <h2>Base Stats</h2>

            <h5>hp</h5>

            <div class="progress">
                <div class="progress-bar" bg-success role="progressbar" aria-label="Example with label" style="width:${hp}%;" aria-valuenow="${hp}" aria-valuemin="0" aria-valuemax="100">${hp}%</div>
            </div>

            <h5>attack</h5>

            <div class="progress">
                <div class="progress-bar" role="progressbar" aria-label="Example with label" style="width:${attack}%;" aria-valuenow="${attack}" aria-valuemin="0" aria-valuemax="100">${attack}%</div>
            </div>

            <h5>defense</h5>

            <div class="progress">
                <div class="progress-bar" role="progressbar" aria-label="Example with label" style="width:${defense}%;" aria-valuenow="${defense}" aria-valuemin="0" aria-valuemax="100">${defense}%</div>
            </div>

            <h5>special attack</h5>

            <div class="progress">
                <div class="progress-bar" role="progressbar" aria-label="Example with label" style="width:${specialAttack}%;" aria-valuenow="${specialAttack}" aria-valuemin="0" aria-valuemax="100">${specialAttack}%</div>
            </div>

            <h5>special defense</h5>

            <div class="progress">
                <div class="progress-bar" role="progressbar" aria-label="Example with label" style="width:${specialDefense}%;" aria-valuenow="${specialDefense}" aria-valuemin="0" aria-valuemax="100">${specialDefense}%</div>
            </div>

            <h5>speed</h5>

            <div class="progress">
                <div class="progress-bar" role="progressbar" aria-label="Example with label" style="width:${speed}%;" aria-valuenow="${speed}" aria-valuemin="0" aria-valuemax="100">${speed}%</div>
            </div>

            </div>
        </div>

    `
    setColorCard(i)
    
}


// change Poke cards

function forward(f) {

            if ( f == 18) {
                closeCard()
            } else { 
                document.getElementById('content').innerHTML =''
                f++
                openCard(f)
            }  
}


function backward(b) {

         if (b == 0){
            closeCard()
         } else {
            document.getElementById('content').innerHTML =''
            b--
            openCard(b)
         }
}




// close Poke cards

function closeCard() {
    console.log("close")
    document.getElementById('content').innerHTML =''
    document.getElementById('more-poke')=''
    document.getElementById('input').value =''
    render()

}

// load more Pokemon
function morePoke() {

    
    
    
    amountOfPoke = amountOfPoke + 20
    

    
    render()
}



// Render Function

async function render() {

            await loadPokemon()
            
            console.log(allPokemon)
            console.log(allPokemonSpecial)


            document.getElementById('content').innerHTML =''
            

            for (i=0; i<amountOfPoke-1; i++) {

                

                document.getElementById('content').innerHTML += `

                    
                    <div id="main-container-${i}" onclick="openCard(${i})">
                    <h1>${allPokemon[i]['name']}</h1>
                    <img src="${allPokemon[i]['sprites']['other']['dream_world']['front_default']}">
                    <h2>#${i+1}</h2>
                    </div>
                    

                    

                `
                setColorMain(i)
            }

           

            let morePoke = document.getElementById('more-poke')
            morePoke.innerHTML =''
            
            morePoke.innerHTML += `
            
                <button onclick="morePoke()"><img src="img/down-button.png"></button>
           
            `

            
            
            
            
        }
        

        
    
