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

for (var i = 0; i < repository.length; i++) {
  var pokemon = document.createElement("div");

  var pokemonTitle = document.createElement("h1");
  if (repository[i].height > 6) {
    pokemonTitle.textContent =
      repository[i].name +
      " (height: " +
      repository[i].height +
      ") " +
      "- Wow, that's big! ')";
    pokemon.setAttribute("class", "grid_item_darken");
  } else {
    pokemonTitle.textContent =
      repository[i].name + " (height: " + repository[i].height + ")";
    pokemon.setAttribute("class", "grid__item");
  }

  document.getElementById("pokemon-container").appendChild(pokemon);
  pokemon.appendChild(pokemonTitle);
}
