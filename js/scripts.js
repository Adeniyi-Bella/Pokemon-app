// Creating an array of objects of Pokemon types
let pokemonRepository = (function () {
   let repository = [
      {
         pokemonName: "Bulbasaur",
         pokemonHeight: 0.7,
         pokemonType: ['grass', 'poison'],
         pokemonAbilities: ['Chlorophyll', 'Overgrow'],
      },
      {
         pokemonName: 'Charmeleon',
         pokemonHeight: 1.1,
         pokemonType: ['fire'],
         pokemonAbilities: ['Blaze', 'Solar-power']
      },
      {
         pokemonName: 'Fearow',
         pokemonHeight: 1.2,
         pokemonType: ['flying', 'normal'],
         pokemonAbilities: ['Keen-eye', 'Sniper']
      }
   ];
   // Function to add a new pokemon object
   function add(pokemon) {
      if (
         typeof pokemon === "object" &&
         "pokemonName" in pokemon &&
         "pokemonHeight" in pokemon &&
         "pokemonType" in pokemon &&
         "pokemonAbilities" in pokemon
      ) { repository.push(pokemon); }
      else { console.log("pokemon is not correct"); }
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
   function eventListen(button,pokemon){
      button.addEventListener('click', function() 
      {showDetails(pokemon)}
      )
   }

   // function called when button is clicked
   function showDetails(pokemon) {
      console.log(pokemon.pokemonName);
      
   }

   return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      eventListen: eventListen
   };
})();

// Adding a new object to the Pokemon Array
pokemonRepository.add({
   pokemonName: 'Fearow',
   pokemonHeight: 0.9,
   pokemonType: ['flying', 'normal'],
   pokemonAbilities: ['Keen-eye', 'Sniper']
})

pokemonRepository.getAll().forEach(pokemon => {
   let getButton=pokemonRepository.addListItem(pokemon);
   pokemonRepository.eventListen(getButton,pokemon);
});

