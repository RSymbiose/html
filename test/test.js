Pokemon.import_pokemon();

// Fonction pour récupérer les pokémons d'un type donné
function getPokemonTypes(typeName) {
    const pokemonsOfType = [];
    for (const pokemonId in Pokemon.all_pokemons) {
        const pokemon = Pokemon.all_pokemons[pokemonId];
        const types = pokemon.getTypes().join(", ");
        if (types.includes(typeName)) {
            pokemonsOfType.push({
                id: pokemon._pokemon_id,
                name: pokemon._pokemon_name,
                form: pokemon._form,
                base_attack: pokemon._base_attack,
                base_defense: pokemon._base_defense,
                base_stamina: pokemon._base_stamina,
                image_path: pokemon._image_path,
                types: types
            });
        }
    }
    console.table(pokemonsOfType);
}

// Fonction pour récupérer les pokémons ayant une attaque donnée
function getPokemonsByAttack(attackName) {
    let pokemons = [];
    console.log("Recherche de Pokémon avec l'attaque :", attackName);
    for (const pokemonId in Pokemon.all_pokemons) {
        const pokemon = Pokemon.all_pokemons[pokemonId];
        if (pokemon.getAttacks().some(attack => attack._name == attackName)) {
            pokemons.push(pokemon);
        }
    }
    console.table(pokemons)
}

// Fonction pour récupérer les attaques d'un type donné
function getAttacksByType(typeName) {
    let attacks = [];
    for (const attackId in Attack.all_attacks) {
        const attack = Attack.all_attacks[attackId];
        if (attack.type === typeName) {
            attacks.push(attack);
        }
    }
    console.table(attacks);
}

// Fonction pour trier les pokémons par nom
function sortPokemonByName() {
    let resPokemon = Object.values(Pokemon.all_pokemons).sort(function(a,b) {
        if (a._pokemon_name > b._pokemon_name) {
            return 1;
        }
        if (a._pokemon_name < b._pokemon_name) {
            return -1;
        }
        return 0;
    }
    );

    console.table(resPokemon);
}

// Fonction pour trier les pokémons par stamina par ordere décroissant
function sortPokemonByStamina() {
    const pokemonsArray = Object.values(Pokemon.all_pokemons);
    pokemonsArray.sort((pokemon1, pokemon2) => {
        return pokemon2.base_stamina - pokemon1.base_stamina;
    });
    console.table(pokemonsArray);
}

// Fonction pour obtenir les ennemis les plus faibles pour une attaque donnée
function getWeakestEnemies(attackName) {
    let maxEffectiveness = 0;
    let weakestEnemies = [];
    
    const attack = Object.values(Attack.all_attacks).find(attack => attack._name === attackName);
    
    if (!attack) {
        throw new Error(`L'attaque '${attackName}' n'existe pas.`);
    }
    for (const pokemon of Object.values(Pokemon.all_pokemons)) {
        let effectiveness = 1;
        
        const pokemonTypes = pokemon._types;

        for (const pokemonType of pokemonTypes) {
            const effectivenessData = type_effectiveness[attack._type];
            if (effectivenessData && effectivenessData[pokemonType]) {
                effectiveness *= effectivenessData[pokemonType];
            }
        }
        
        if (effectiveness > maxEffectiveness) {
            maxEffectiveness = effectiveness;
            weakestEnemies = [pokemon];
        } else if (effectiveness === maxEffectiveness) {
            weakestEnemies.push(pokemon);
        }
    }
    console.table(weakestEnemies);
}


// Fonction pour obtenir les types d'attaques les moins efficaces contre un Pokémon donné
function getBestAttackTypesForEnemy(pokemonName) {
    const mostEffectiveTypes = {};
    
    const pokemon = Object.values(Pokemon.all_pokemons).find(pokemon => pokemon._pokemon_name === pokemonName);
    
    if (!pokemon) {
        console.log(`Pokemon '${pokemonName}' not found.`);
        return mostEffectiveTypes;
    }
    
    const pokemonTypes = pokemon._types;
    
    for (const pokemonType of pokemonTypes) {
        let bestMultiplier = -Infinity;
        let bestTypes = [];
        
        for (const attackType in type_effectiveness) {
            const effectivenessData = type_effectiveness[attackType];
            const multiplier = effectivenessData[pokemonType];
            
            if (multiplier > bestMultiplier) {
                bestMultiplier = multiplier;
                bestTypes = [attackType];
            } else if (multiplier === bestMultiplier) {
                bestTypes.push(attackType);
            }
        }
        
        mostEffectiveTypes[pokemonType] = bestTypes;
    }
    
    console.table(mostEffectiveTypes);
}


// Fonction principale pour exécuter les tests
function runTest(testName) {
    const argument = document.getElementById("argument").value;

    switch (testName) {
        case 'getPokemonTypes':
            getPokemonTypes(argument);
            break;
        case 'getPokemonsByAttack':
            getPokemonsByAttack(argument);
            break;
        case 'getAttacksByType':
            getAttacksByType(argument);
            break;
        case 'sortPokemonByName':
            sortPokemonByName();
            break;
        case 'sortPokemonByStamina':
            sortPokemonByStamina();
            break;
        case 'getWeakestEnemies':
            getWeakestEnemies(argument);
            break;
        case 'getBestAttackTypesForEnemy':
            getBestAttackTypesForEnemy(argument);
            break;
        default:
            console.log("Test non reconnu");
    }
}
    