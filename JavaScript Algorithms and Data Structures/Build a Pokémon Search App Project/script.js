// Select elements
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const spriteContainer = document.getElementById("sprite-container");

// PokéAPI Proxy URL
const POKEAPI_PROXY_URL = "https://pokeapi.co/api/v2/pokemon/";

// Fetch Pokémon data
async function fetchPokemon(query) {
  try {
    const response = await fetch(`${POKEAPI_PROXY_URL}${query.toLowerCase()}`);
    if (!response.ok) {
      throw new Error("Pokémon not found");
    }
    return await response.json();
  } catch (error) {
    alert("Pokémon not found");
    clearDetails();
    return null;
  }
}

// Clear previous details
function clearDetails() {
  pokemonName.textContent = "";
  pokemonId.textContent = "";
  weight.textContent = "";
  height.textContent = "";
  types.innerHTML = "";
  hp.textContent = "";
  attack.textContent = "";
  defense.textContent = "";
  specialAttack.textContent = "";
  specialDefense.textContent = "";
  speed.textContent = "";
  spriteContainer.innerHTML = "";
}

// Display Pokémon details
function displayPokemonDetails(pokemon) {
  clearDetails();

  // Set Pokémon details
  pokemonName.textContent = pokemon.name.toUpperCase();
  pokemonId.textContent = `#${pokemon.id}`;
  weight.textContent = pokemon.weight;
  height.textContent = pokemon.height;

  // Add types
  pokemon.types.forEach((type) => {
    const typeSpan = document.createElement("span");
    typeSpan.textContent = type.type.name.toUpperCase();
    types.appendChild(typeSpan);
  });

  // Set stats
  const stats = pokemon.stats;
  hp.textContent = stats[0].base_stat; // HP
  attack.textContent = stats[1].base_stat; // Attack
  defense.textContent = stats[2].base_stat; // Defense
  specialAttack.textContent = stats[3].base_stat; // Special Attack
  specialDefense.textContent = stats[4].base_stat; // Special Defense
  speed.textContent = stats[5].base_stat; // Speed

  // Add sprite
  const sprite = document.createElement("img");
  sprite.id = "sprite";
  sprite.src = pokemon.sprites.front_default;
  sprite.alt = pokemon.name;
  spriteContainer.appendChild(sprite);
}

// Search Pokémon on button click
searchButton.addEventListener("click", async () => {
  const query = searchInput.value.trim();
  if (!query) {
    alert("Please enter a Pokémon name or ID");
    return;
  }

  const pokemon = await fetchPokemon(query);
  if (pokemon) {
    displayPokemonDetails(pokemon);
  }
});

