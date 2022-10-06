// Creating an array of objects of Pokemon types

// console.log(typeof({}))
let pokemonRepository = (function () {
  let pokemonList = [
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
  ]

  return {
    add: function (pokemon) {
      if (typeof (pokemon) === 'object') {
        pokemonList.push(pokemon);
      }
      else { 'An object is expected' }
    },

    getAll: function () {
      return pokemonList;
    }
  }
})();

// Adding a new object to the Pokemon Array
pokemonRepository.add({
  pokemonName: 'Fearow',
  pokemonHeight: 0.9,
  pokemonType: ['flying', 'normal'],
  pokemonAbilities: ['Keen-eye', 'Sniper']
})

document.write('<p class= "heading">List of Pokemons with their height </p>')

// Writing to DOM name and Height of Pokemon
pokemonRepository.getAll().forEach(pokemon => {
  let Name = pokemon.pokemonName
  let Height = pokemon.pokemonHeight
  // Checking if Pokemon is taller than 1m
  if (Height > 1.0) {
    // document.write(pokemon.imgPath)
    document.write(`<p>${Name} (height:${Height}m) - Wow That's Big!! </p>`)
  } else {
    document.write(`<p>${Name} (height:${Height}m) </p>`)
  }
});
