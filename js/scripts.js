var pokemonRepository = (function() {
  var repository = [];

  repository = [
    {
      name: "Bulbasaur",
      height: 0.7,
      types: ["grass", "poison"],
    },
    {
      name: "Ivysaur",
      height: 1,
      types: ["grass", "poison"],
    },
    {
      name: "Venusaur",
      height: 2,
      types: ["grass", "poison"],
    },
    {
      name: "Charmander",
      height: 0.6,
      types: ["fire"],
    },
    {
      name: "Charmeleon",
      height: 1.1,
      types: ["fire"],
    },
    {
      name: "Charizard",
      height: 7,
      types: ["fire", "flying"],
    },
  ];

  function add(pokemon) {
    if (typeof pokemon === "object") {
      console.log(Object.keys(pokemon));
      console.log(Object.keys(repository));
      repository.push(pokemon);
    }
  }

  function getAll() {
    return repository;
  }

  return {
    add: add,
    getAll: getAll,
  };
})();

pokemonRepository.add({
  name: "Pikachu",
  height: 0.4,
  types: ["electric"],
});

pokemonRepository.getAll().forEach(function(currentPokemon) {
  var pokemon = document.createElement("div");

  var pokemonTitle = document.createElement("h1");
  if (currentPokemon.height > 6) {
    pokemonTitle.textContent =
      currentPokemon.name +
      " (height: " +
      currentPokemon.height +
      ") " +
      "- Wow, that's big! ')";
    pokemon.setAttribute("class", "grid_item_darken");
  } else {
    pokemonTitle.textContent =
      currentPokemon.name + " (height: " + currentPokemon.height + ")";
    pokemon.setAttribute("class", "grid__item");
  }

  document.getElementById("pokemon-container").appendChild(pokemon);
  pokemon.appendChild(pokemonTitle);
});
