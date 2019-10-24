var pokemonRepository = (function() {
  var repository = [
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
      repository.push(pokemon);
    } else {
      return "Invaid Entry";
    }
  }

  function getAll() {
    return repository;
  }

  //Render Pokemons to screen
  function addListItem(pokemon) {
    var $listItem = document.createElement("li");
    var $pokemonButton = document.createElement("button");
    $pokemonList.appendChild($listItem);
    $pokemonButton.innerText = pokemon.name;
    $pokemonButton.classList.add("pokemon-button");
    $listItem.appendChild($pokemonButton);

    //Add Event Listner for button click
    $pokemonButton.addEventListener("click", function() {
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    console.log(pokemon);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
  };
})();

pokemonRepository.add({
  name: "Pikachu",
  height: 0.4,
  types: ["electric"],
});

var $pokemonList = document.querySelector(".pokemon-list");

pokemonRepository.getAll().forEach(function(currentPokemon) {
  pokemonRepository.addListItem(currentPokemon);
});
