const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon();
  pokemon.number = pokeDetail.id;
  pokemon.name = pokeDetail.name;

  const abilities = pokeDetail.abilities.map((abilitySlot) =>
    abilitySlot.ability.name.replace(/-/g, " ")
  );
  const [ability] = abilities;

  pokemon.abilities = abilities;
  pokemon.ability = ability;

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;

  pokemon.types = types;
  pokemon.type = type;

  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

  return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon);
};

pokeApi.getPokemons = (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails);
};

// let pokeId = 1;
// const urlDetailed = `https://pokeapi.co/api/v2/pokemon/${pokeId}`;

// fetch(urlDetailed)
//   .then((response) => response.json())
//   .then((pokemonDetailed) => console.log(pokemonDetailed));
// .catch((error) => console.error(error));

// function DetailToHtml(pokemon) {
//   return `
//   <li class="pokemon ${pokemon.type} popuptext myPopup" onclick="myFunction()">
//       <span class="number">#${pokemon.number}</span>
//       <span class="name">${pokemon.name}</span>

//   <img src="https://pokeapi.co/api/v2/pokemon/1/" alt="${pokemon.name} " />
//   <div class="detail-section">${pokemon.stats}</div>`;
// }

// const pokemonContainer = document.getElementById("detail-container");
// pokemonContainer.innerHTML += `  <li class="pokemon ${pokemon.type} popuptext myPopup" onclick="myFunction()">
// //       <span class="number">#${pokemon.number}</span>
// //       <span class="name">${pokemon.name}</span>

// //   <img src="https://pokeapi.co/api/v2/pokemon/1/" alt="${pokemon.name} " />
// //   <div class="detail-section">${pokemon.stats}</div>`;
