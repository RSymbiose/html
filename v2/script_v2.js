// script_v2.js
window.onload = function() {
    class_pokemon.import_pokemon();
    let allPokemons = [];
    for (let pokemonId in class_pokemon.all_pokemons) {
        allPokemons.push(class_pokemon.all_pokemons[pokemonId]);
    }

    let currentPage = 1;
    const pokemonsPerPage = 25;

    function displayPokemons() {
        let table = document.getElementById('pokemonTable');
        while (table.rows.length > 1) {
            table.deleteRow(1);
        }

        let startIndex = (currentPage - 1) * pokemonsPerPage;
        let endIndex = startIndex + pokemonsPerPage;
        let pokemonsToDisplay = allPokemons.slice(startIndex, endIndex);

        for (let pokemon of pokemonsToDisplay) {
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

        document.getElementById('pageInfo').textContent = `Page ${currentPage} de ${Math.ceil(allPokemons.length / pokemonsPerPage)}`;

        document.getElementById('prevButton').disabled = currentPage === 1;
        document.getElementById('nextButton').disabled = endIndex >= allPokemons.length;
    }

    document.getElementById('prevButton').addEventListener('click', () => {
        currentPage--;
        displayPokemons();
    });

    document.getElementById('nextButton').addEventListener('click', () => {
        currentPage++;
        displayPokemons();
    });

    displayPokemons();
};