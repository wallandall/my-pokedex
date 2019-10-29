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

  var $modalContainer = document.querySelector("#modal-container");
  //Show Title, text and image in model
  function showModal(title, text, image) {
    // Clear all existing modal content
    $modalContainer.innerHTML = "";

    var modal = document.createElement("div");
    modal.classList.add("modal");

    // Add the new modal content
    var closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("modal-close");
    closeButtonElement.innerText = "x";
    closeButtonElement.addEventListener("click", hideModal);

    //Pokemon Name
    var titleElement = document.createElement("h1");
    titleElement.innerText = title;

    //Pokemon Height
    var contentElement = document.createElement("p");
    contentElement.innerText = "Height: " + text;

    //Pokemon Image
    var imageElement = document.createElement("img");
    imageElement.src = image;
    imageElement.classList.add("pokemon-image");

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(imageElement);
    $modalContainer.appendChild(modal);
    //Make the Modal Visible
    $modalContainer.classList.add("is-visible");
  }

  //Hide Modal
  function hideModal() {
    $modalContainer.classList.remove("is-visible");
  }

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function() {
      showModal(item.name, item.height, item.imgUrl);
    });
  }

  //Hide modal if user hits the esc key
  window.addEventListener("keydown", e => {
    if (
      e.key === "Escape" &&
      $modalContainer.classList.contains("is-visible")
    ) {
      hideModal();
    }
  });

  //Hide model if user clicks on the modal overlay
  $modalContainer.addEventListener("click", e => {
    var target = e.target;
    if (target === $modalContainer) {
      hideModal();
    }
  });

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
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    hideModal: hideModal,
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
