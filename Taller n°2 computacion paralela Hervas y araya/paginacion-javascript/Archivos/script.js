const lists__pokemons = document.getElementById('lists__pokemons')
const buttons = document.getElementById('buttons')
let urlPokemon = ' https://pokeapi.co/api/v2/pokemon? offset=0&limit=10'
let btnNext;
let btnPrevious;
let templateHtml;
console.log('⏮⏩')

const GetPokemons = async (url) => {
    try {
        const response = await fetch(url)
        const results = await response.json();
        console.log(results)
        DataPokemons(results.results)
        btnNext=results.next ? `<button class="btn" data-url=${results.next}>⏩</button>` : ''
        btnPrevious=results.previous ? `<button class="btn" data-url=${results.previous}>⏮</button>` : ''
        buttons.innerHTML=btnPrevious + " " + btnNext
        

    } catch (error) {
        console.log(error)
    }
}
GetPokemons(urlPokemon)

const DataPokemons = async (data) => {
    lists__pokemons.innerHTML = '';
    try {
        for (let index of data) {

            const resp = await fetch(index.url)
            const resul = await resp.json();
            console.log(resul)
            templateHtml=`
            <div class="pokemon__img">
            <img src=${resul.sprites.other.dream_world.front_default} alt=${resul.name}/>
            <p> ID: ${resul.id}<p>${resul.name}</p>Peso: ${resul.weight}kg <p> altura: ${resul.height}0cm <p>
            </div>
            `
            lists__pokemons.innerHTML+=templateHtml
        }
        
    } catch (error) {
        console.log(error)
    }
}

buttons.addEventListener('click',(e)=>{
    if(e.target.classList.contains('btn')){
        let value=e.target.dataset.url
        console.log(value)
        GetPokemons(value)
    }
})