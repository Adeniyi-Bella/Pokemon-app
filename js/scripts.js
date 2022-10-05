// Creating an array of objects of Pokemon types
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
  ];
  document.write('<p class= "heading">List of Pokemons with their height </p>')
  // Writing to DOM name and Height of Pokemon
  pokemonList.forEach(pokemon => {
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
  
  