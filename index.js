const pokemonlist = async () =>{ 
let pokemonArray = [];
for(let i = 1; i <= 151; i++){
const res = await fetch('https://pokeapi.co/api/v2/pokemon/' + i)
  const pokemon = await res.json()
  console.log(pokemon);
 pokemonArray.push(pokemon);
}
return pokemonArray;
};

  const mapPokemon = (pokemons) => {
    const mappedPokemon = pokemons.map(pokemon => (
      {
      id: pokemon.id,
      name: pokemon.name.toUpperCase(),
      sprites: pokemon.sprites.versions["generation-vii"]["ultra-sun-ultra-moon"].front_default,
      sprites2: pokemon.sprites.versions["generation-vii"]["ultra-sun-ultra-moon"].front_shiny,
      types: pokemon.types.map(type =>type.type.name),
      height: pokemon.height,
      weight: pokemon.weight
    }
    ));

    return mappedPokemon;
  } 

  const sacarPokemons = (pokemons) => { 
    let container$$ = document.querySelector(".container")
    container$$.innerHTML = '';
    const flipCard$$ = document.createElement("div");
    flipCard$$.className = "flip-card";

    flipCard$$.appendChild(container$$);

    for (const pokemon of pokemons) {
      const div$$ = document.createElement("div");
      div$$.className ="carta_frontal";

      const name$$ = document.createElement("h1");
      name$$.className = "carta_frontal__contenido";
      name$$.textContent = pokemon.name;

      const id$$ = document.createElement("span");
      id$$.textContent ="Nº "+ pokemon.id;
      id$$.className = "carta_frontal__contenido";

      const types$$ = document.createElement("span");
      types$$.textContent =pokemon.types;
      types$$.className = "carta_frontal__contenido";

      const height$$ = document.createElement("span");
      height$$.textContent ="Altura: "+ pokemon.height/10 + " Metros";
      height$$.className = "carta_frontal__contenido";

      const weight$$ = document.createElement("span");
      weight$$.textContent ="Peso: " + pokemon.weight/10 + " kilos";
      weight$$.className = "carta_frontal__contenido";

      const img$$ = document.createElement("img")
      img$$.setAttribute("src", pokemon.sprites);
      img$$.className = "carta_frontal__img";


      div$$.appendChild(img$$);
      div$$.appendChild(name$$);
      div$$.appendChild(id$$);
      div$$.appendChild(types$$);
      div$$.appendChild(height$$);
      div$$.appendChild(weight$$);
      container$$.appendChild(div$$);

      const back$$ = document.createElement("div");
      back$$.className = "back";
      back$$.textContent = "Hola";
      container$$.appendChild(back$$);
      document.body.appendChild(flipCard$$);

      container$$.addEventListener("click", () => container$$.classList.toggle("is flipped"))
    }
    
  }

const buscadorPkm = (name, pokemon) =>{
  const filtroPKm = pokemon.filter( (pkm) => pkm.name.toLowerCase().includes(name.toLowerCase()));
  sacarPokemons(filtroPKm);
}

const buscarBtn = (pokemon) => {
  const nav$$ = document.querySelector(".titulo");
  const input$$ = document.createElement("input");
  const button$$ = document.createElement("button");
  button$$.className ="btn";
  button$$.textContent ="BUSCAR"
  nav$$.appendChild(input$$);
  nav$$.appendChild(button$$);
  button$$.addEventListener("click", () => buscadorPkm(input$$.value, pokemon));
}

const aleatorio = () => {
  const numAleatorio = Math.floor(Math.random() * (151 - 1 + 1)+ 1);
  console.log(numAleatorio);
}

const pkmAleatorio = () => {
  if(mapPokemon.id === aleatorio()){
    sacarPokemons();
  }

}

const btnAleatorio = () => {
  const rand$$ = document.querySelector(".random");
  const buttonAlt$$ = document.createElement("button")
  buttonAlt$$.textContent = "Random";
  rand$$.appendChild(buttonAlt$$);
  buttonAlt$$.addEventListener("click", () => pkmAleatorio());
}




  const init = async () => {
    const pokemon = await pokemonlist();
    const mappedPokemon = mapPokemon(pokemon);
    console.log(mappedPokemon);
    sacarPokemons(mappedPokemon);
    buscarBtn(mappedPokemon);
    btnAleatorio(mappedPokemon);

  }

  init();



  
 





  
