/****ASYNC AWAIT SOLUTION*****/

// Creating an array of objects of Pokemon types
let pokemonRepository = (function () {
  let repository = [];
  var modal = document.getElementById('myModal');
  let loader = document.querySelector('#loader');

  // Showing Spinner
  function showLoadingMessage(id) {
    id.style.display = 'block';
  }
  // fetching Pokemon details from external API
  async function loadList() {
    showLoadingMessage(loader);
    try {
      let apiUrl = await fetch(
        'https://pokeapi.co/api/v2/pokemon/?limit=50'
      );
      // Converting to json
      let jsonConvert = await apiUrl.json();
      let Json = jsonConvert.results;
      Json.forEach(async function (item) {
        // creating a pokemon dictionary of name and url
        let pokemon = {
          pokemonName: item.name,
          detailsUrl: item.url,
        };
        // pushing pokemon object created to repository array
        add(pokemon);
      });
    } catch (error) {
      console.log(error);
    }
  }

  function add(pokemon) {
    repository.push(pokemon);
  }

  // Function to get all pokemon collection in array
  function getAll() {
    return repository;
  }

  // Adding more information to each pokemon
  async function loadDetails(pokemon) {
    // console.log(pokemon);
    let url = pokemon.detailsUrl;
    try {
      let response = await fetch(url);
      let details = await response.json();
      pokemon.imageUrl = details.sprites.front_default;
      pokemon.height = details.height;
      pokemon.types = details.types;
    } catch (error) {
      console.log(error);
    }
    return pokemon;
  }

  // function to create a front end for our pokemon array
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.list-group');
    let listpokemon = document.createElement('li');
    listpokemon.classList.add('list-one');
    let pokemonImg = document.createElement('img');
    pokemonImg.classList.add('image-one');
    let PokemonName = document.createElement('h4');
    PokemonName.classList.add('Name-one');
    PokemonName.innerText = pokemon.pokemonName;
    pokemonImg.src = pokemon.imageUrl;
    let button = document.createElement('button');
    button.innerText = 'click me';
    button.classList.add('click-me');
    listpokemon.appendChild(pokemonImg);
    listpokemon.appendChild(button);
    listpokemon.appendChild(PokemonName);
    pokemonList.appendChild(listpokemon);
    return button;
  }

  // Hiding spinner gif
  function hideLoadingMessage() {
    let spinner = document.querySelector('#loader');
    spinner.style.display = 'none';
  }

  // function to know when button is clicked
  function eventListen(button, pokemon) {
    // console.log(button);
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
  }

  async function showDetails(pokemon) {
    showPokemon(pokemon);
  }

  function showPokemon(pokemon) {
    console.log(pokemon.pokemonName);
    modal.style.display = 'block';
    let getpokemonIdtoDisplay = document.getElementById('Name-two');
    getpokemonIdtoDisplay.innerText = `I am called ${pokemon.pokemonName}. This is my modal view`;
    let getpokemonImgtoDisplay = document.getElementById('image-two');
    getpokemonImgtoDisplay.src = pokemon.imageUrl;
    let borderDisplay = document.getElementById('show-details');
    borderDisplay.style.display = 'block';
  }

  let btnCloseModal = document.querySelector('.close-modal');
  btnCloseModal.addEventListener('click', function () {
    modal.style.display = 'none';
  });

  return {
    loadList: loadList,
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    eventListen: eventListen,
    loadDetails: loadDetails,
    hideLoadingMessage: hideLoadingMessage,
    showPokemon: showPokemon,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(async (pokemon) => {
    await pokemonRepository.loadDetails(pokemon);
    let getButton = pokemonRepository.addListItem(pokemon);
    pokemonRepository.hideLoadingMessage();
    pokemonRepository.eventListen(getButton, pokemon);
  });
});
