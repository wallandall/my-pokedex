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
        item.imgUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types.map(function(pokemon) {
          return pokemon.type.name;
        });
        item.weight = details.weight;
        isLoading(false);
      })
      .catch(function(e) {
        console.error(e);
        isLoading(false);
      });
  }

  //Check if object is not an array and of specific length
  function isObject(obj, objLength) {
    return (
      Object.prototype.toString.call(obj) === "[object Object]" &&
      Object.keys(obj).length === objLength
    );
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
  function addListItem(pokemon) {
    $listItem = $(
      '<button type="button" class="list-group-item pokemon-button title" data-toggle="modal" data-target="#pokemon-modal"></button>',
    );
    $listItem.text(pokemon.name);
    $pokemonList.append($listItem);
    $listItem.click(function() {
      showDetails(pokemon);
    });
  }

  //Show Title, text and image in model
  function showModal(title, text, image, weight, types) {
    $("#pokemon-title").text(title);
    $(".modal-body")
      .empty()
      .append('<img class="pokemon-image" />')
      .append('<p id="pokemon-height">Height: ' + text + "</p>")
      .append('<p id="pokemon-weight">Weight: ' + weight + "</p>")
      .append('<p id="pokemon-types">Type: ' + types + "</p>");

    $(".pokemon-image").attr("src", image);
  }

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function() {
      showModal(item.name, item.height, item.imgUrl, item.weight, item.types);
    });
  }

  function isLoading(loading) {
    if (loading) {
      $spinner.addClass("is-loading");
      $spinner.removeClass("is-not-loading");
    } else {
      $spinner.addClass("is-not-loading");
      $spinner.removeClass("not-loading");
    }
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
  };
})();

var $pokemonList = $("#pokemon-list");
var $spinner = $("#spinner");

pokemonRepository.loadList().then(function() {
  // Loop throu all items in list
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
