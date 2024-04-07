window.onload = function() {
    class_pokemon.import_pokemon();
    let table = document.getElementById('pokemonTable');
    for (let pokemonId in class_pokemon.all_pokemons) {
        let pokemon = class_pokemon.all_pokemons[pokemonId];
        let tr = document.createElement('tr');
        let tdId = document.createElement('td');
        let paddedId = pokemon._pokemon_id.toString().padStart(3, '0');
        tdId.textContent = paddedId;
        tr.appendChild(tdId);
        let tdName = document.createElement('td');
        tdName.textContent = pokemon._pokemon_name;
        tr.appendChild(tdName);
        let tdGeneration = document.createElement('td');
        tdGeneration.textContent = pokemon._pokemon_generation;
        tr.appendChild(tdGeneration);
        let tdTypes = document.createElement('td');
        // Utilisez la méthode getTypes() pour obtenir les types du Pokémon
        let types = pokemon.getTypes().join(", ");
        console.log(pokemon.getTypes());
        tdTypes.textContent = types;
        tr.appendChild(tdTypes);
        let tdStamina = document.createElement('td');
        tdStamina.textContent = pokemon._base_stamina;
        tr.appendChild(tdStamina);
        let tdBaseAttack = document.createElement('td');
        tdBaseAttack.textContent = pokemon._base_attack;
        tr.appendChild(tdBaseAttack);
        let tdBaseDefense = document.createElement('td');
        tdBaseDefense.textContent = pokemon._base_defense;
        tr.appendChild(tdBaseDefense);
        let tdImage = document.createElement('td');
        let imageUrl = `../webp/images/${paddedId}.webp`;
        tdImage.innerHTML = `<img class="pokemon-image" src="${imageUrl}" alt="${pokemon._pokemon_name}">`;
        tr.appendChild(tdImage);
        table.appendChild(tr);
    }
};
