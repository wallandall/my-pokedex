const pokemonRepository = (function() {
  const repository = [];
  const apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function loadList() {
    isLoading(true);
    return fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        json.results.forEach(function(item) {
          add({ name: item.name, detailsUrl: item.url });
        });
        isLoading(false);
      })
      .catch(function(e) {
        console.error(e);
        isLoading(false);
      });
  }

  function loadDetails(item) {
    var url = item.detailsUrl;
    isLoading(true);
    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = Object.keys(details.types);
        isLoading(false);
      })
      .catch(function(e) {
        console.error(e);
        isLoading(false);
      });
  }

  //Check if object is not an array and of specific length
  function isObject(obj, objLength) {
    if (
      Object.prototype.toString.call(obj) === "[object Object]" &&
      Object.keys(obj).length === objLength
    ) {
      return true;
    } else {
      return false;
    }
  }

  //Add Pokemon Object
  function add(pokemon) {
    if (isObject(pokemon, 2)) {
      repository.push(pokemon);
    } else {
      throw "Invaid Entry";
    }
  }

  function getAll() {
    return repository;
  }

  //Render Pokemons to screen
  function addListItem(pokemon, item) {
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

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function() {
      console.log(item);
    });
  }

  function isLoading(loading) {
    if (loading) {
      $spinner.classList.remove("is-not-loading");
      $spinner.classList.add("is-loading");
    } else {
      $spinner.classList.remove("is-loading");
      $spinner.classList.add("is-not-loading");
    }
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
  };
})();

var $pokemonList = document.querySelector(".pokemon-list");
var $spinner = document.querySelector("#spinner");

pokemonRepository.loadList().then(function() {
  // Loop throu all items in list
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
