// // Creating an array of objects of Pokemon types
// let pokemonRepository = (function () {
//    let repository = [];
//    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=5';
//    // Function to add a new pokemon object
//    function add(pokemon) {
//       repository.push(pokemon);
//    }

//    // Function to get all pokemon collection in array
//    function getAll() {
//       return repository;
//    }

//    // function to create a front end for our pokemon array
//    function addListItem(pokemon) {
//       let pokemonList = document.querySelector(".pokemon-list");
//       let listpokemon = document.createElement("li");
//       let button = document.createElement("button");
//       button.innerText = pokemon.pokemonName;
//       button.classList.add("button-class");
//       listpokemon.appendChild(button);
//       pokemonList.appendChild(listpokemon);
//       return button
//    }

//    // function to know when button is clicked
//    function eventListen(button, pokemon) {
//       button.addEventListener('click', function () { showDetails(pokemon) }
//       )
//    }

//    // function called when button is clicked
//    function showDetails(pokemon) {
//       loadDetails(pokemon).then(function () {
//          console.log(pokemon);
//       });
//    }

//    function loadList() {
//       return fetch(apiUrl).then(function (response) {
//          return response.json();
//       }).then(function (json) {
//          json.results.forEach(function (item) {
//             let pokemon = {
//                pokemonName: item.name,
//                detailsUrl: item.url
//             };
//             //  console.log(pokemon);
//             add(pokemon);
//          });
//       }).catch(function (e) {
//          console.error(e);
//       })
//    }

//    function loadDetails(item) {
//       let url = item.detailsUrl;
//       return fetch(url).then(function (response) {
//          return response.json();
//       }).then(function (details) {
//          // Now we add the details to the item
//          item.imageUrl = details.sprites.front_default;
//          item.height = details.height;
//          item.types = details.types;
//       }).catch(function (e) {
//          console.error(e);
//       });
//    }

//    return {
//       loadList: loadList,
//       add: add,
//       getAll: getAll,
//       addListItem: addListItem,
//       eventListen: eventListen,
//       loadDetails: loadDetails
//    };
// })();

// pokemonRepository.loadList().then(function () {
//    pokemonRepository.getAll().forEach(pokemon => {
//       let getButton = pokemonRepository.addListItem(pokemon);
//       pokemonRepository.eventListen(getButton, pokemon);
//    });
// })



/****ASYNC AWAIT SOLUTION*****/

// Creating an array of objects of Pokemon types
let pokemonRepository = (function () {
   let repository = [];
   // let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=5';
   // Function to add a new pokemon object
   function add(pokemon) {
      repository.push(pokemon);
   }

   // Function to get all pokemon collection in array
   function getAll() {
      return repository;
   }

   // function to create a front end for our pokemon array
   function addListItem(pokemon) {
      let pokemonList = document.querySelector(".pokemon-list");
      let listpokemon = document.createElement("li");
      let button = document.createElement("button");
      button.innerText = pokemon.pokemonName;
      button.classList.add("button-class");
      listpokemon.appendChild(button);
      pokemonList.appendChild(listpokemon);
      return button
   }

   // function to know when button is clicked
   function eventListen(button, pokemon) {
      button.addEventListener('click', function () { showDetails(pokemon) }
      )
   }
   // calls the loadDetails function when button is clicked
   async function showDetails(pokemon) {
      await loadDetails(pokemon)
      console.log(pokemon);
   }

   function showLoadingMessage() {
      let spinner = document.querySelector('.loader')
      spinner.style.display = 'block'
   }
   function hideLoadingMessage() {
      let spinner = document.querySelector('.loader')
      spinner.style.display = 'none'
   }
   // creating a list of pokemon objects
   async function loadList() {
      showLoadingMessage()
      // Fetching the pokemon api
      let apiUrl = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=5');
      // Converting to json
      let jsonConvert = await apiUrl.json()
      let Json = jsonConvert.results
      Json.forEach(function (item) {
         // creating a pokemon dictionary of name and url
         let pokemon = {
            pokemonName: item.name,
            detailsUrl: item.url
         };
         // pushing pokemon object created to repository array
         add(pokemon);
      });
   }

   // Adding more information to each pokemon
   async function loadDetails(pokemon) {
      let url = pokemon.detailsUrl;
      try {
         let response = await fetch(url)
         let details = await response.json();
         pokemon.imageUrl = details.sprites.front_default;
         pokemon.height = details.height;
         pokemon.types = details.types;
      } catch (error) {
         console.log(error);
      }
   }

   return {
      loadList: loadList,
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      eventListen: eventListen,
      loadDetails: loadDetails,
      hideLoadingMessage: hideLoadingMessage
   };
})();

pokemonRepository.loadList().then(function () {
   pokemonRepository.getAll().forEach(pokemon => {
      let getButton = pokemonRepository.addListItem(pokemon);
      pokemonRepository.hideLoadingMessage()
      pokemonRepository.eventListen(getButton, pokemon);
   });
})
