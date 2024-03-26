// script_v1.js
window.onload = function() {
    class_pokemon.import_pokemon();
    let table = document.getElementById('pokemonTable');
    for (let pokemonId in class_pokemon.all_pokemons) {
        let pokemon = class_pokemon.all_pokemons[pokemonId];
        let tr = document.createElement('tr');
        let tdId = document.createElement('td');
        tdId.textContent = pokemon._pokemon_id;
        tr.appendChild(tdId);
        let tdName = document.createElement('td');
        tdName.textContent = pokemon._pokemon_name;
        tr.appendChild(tdName);
        let tdGeneration = document.createElement('td');
        tdGeneration.textContent = pokemon._pokemon_generation;
        tr.appendChild(tdGeneration);
        let tdTypes = document.createElement('td');
        tdTypes.textContent = pokemon.getTypes().join(", ");
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
        tdImage.innerHTML = `<img src="url_to_image" alt="${pokemon._pokemon_name}">`;
        tr.appendChild(tdImage);
        table.appendChild(tr);
    }
};