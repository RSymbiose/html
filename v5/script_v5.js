window.onload = function() {
    class_pokemon.import_pokemon();
    let allPokemons = [];
    let table = document.getElementById('pokemonTable');
    for (let pokemonId in class_pokemon.all_pokemons) {
        allPokemons.push(class_pokemon.all_pokemons[pokemonId]);
    }

    let currentPage = 1;
    const pokemonsPerPage = 25;

    let generationFilter = document.getElementById('generationFilter');
    let generations = [...new Set(allPokemons.map(pokemon => pokemon._pokemon_generation))];
    for (let generation of generations) {
        let option = document.createElement('option');
        option.value = generation;
        option.textContent = `Generation ${generation}`;
        generationFilter.appendChild(option);
    }
    let typeFilter = document.getElementById('typeFilter');
    for (let type of Object.values(class_type.all_types)) {
        let option = document.createElement('option');
        option.value = type._type_name;
        option.textContent = type._type_name;
        typeFilter.appendChild(option);
    }

    function displayPokemons() {
        while (table.rows.length > 1) {
            table.deleteRow(1);
        }

        let filteredPokemons = allPokemons;
        let generation = Number(generationFilter.value);
        if (generation) {
            filteredPokemons = filteredPokemons.filter(pokemon => pokemon._pokemon_generation === generation);
        }
        let type = typeFilter.value;
        if (type) {
            filteredPokemons = filteredPokemons.filter(pokemon => pokemon.getTypes().join(", ").includes(type));
        }
        let name = document.getElementById('nameFilter').value.toLowerCase();
        if (name) {
            filteredPokemons = filteredPokemons.filter(pokemon => pokemon._pokemon_name.toLowerCase().includes(name));
        }

        let startIndex = (currentPage - 1) * pokemonsPerPage;
        let endIndex = startIndex + pokemonsPerPage;
        let pokemonsToDisplay = filteredPokemons.slice(startIndex, endIndex);

        for (let pokemon of pokemonsToDisplay) {
            let tr = document.createElement('tr');
            let tdId = document.createElement('td');
            tdId.textContent = pokemon._pokemon_id;
            tr.appendChild(tdId);
            let paddedId = pokemon._pokemon_id.toString().padStart(3, '0');
            tdId.textContent = paddedId;
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
            let imageUrl = `../webp/images/${paddedId}.webp`;
            tdImage.innerHTML = `<img class="pokemon-image" src="${imageUrl}" alt="${pokemon._pokemon_name}">`;
            tr.appendChild(tdImage);

            tr.addEventListener('click', () => {
                displayPokemonDetails(pokemon);
            });

            table.appendChild(tr);
        }

        document.getElementById('pageInfo').textContent = `Page ${currentPage} de ${Math.ceil(filteredPokemons.length / pokemonsPerPage)}`;
        document.getElementById('prevButton').disabled = currentPage === 1;
        document.getElementById('nextButton').disabled = endIndex >= filteredPokemons.length;
        document.getElementById('generationFilter').value = generation;
        document.getElementById('typeFilter').value = type;
        document.getElementById('nameFilter').value = name;
    }

    let currentSortKey = null;
    let currentSortOrder = 'asc';
    
    let headers = document.querySelectorAll('#pokemonTable th');
    headers.forEach(header => {
        header.addEventListener('click', () => {
            let sortKey = header.dataset.sortKey;
            if (sortKey && sortKey !== 'image') {
                if (sortKey === currentSortKey) {
                    // If the clicked column is the same as the currently sorted column, reverse the sort order
                    currentSortOrder = currentSortOrder === 'asc' ? 'desc' : 'asc';
                } else {
                    // If the clicked column is different, update the sorted column and reset the sort order to ascending
                    currentSortKey = sortKey;
                    currentSortOrder = 'asc';
                }
                sortPokemons(currentSortKey, currentSortOrder);
                headers.forEach(h => h.style.fontWeight = h === header ? 'bold' : 'normal');
            }
        });
    });

    function sortPokemons(sortKey, sortOrder) {
        // Sort the allPokemons array based on the sortKey and sortOrder
        allPokemons.sort((a, b) => {
            let aValue = typeof a[sortKey] === 'function' ? a[sortKey]() : a[sortKey];
            let bValue = typeof b[sortKey] === 'function' ? b[sortKey]() : b[sortKey];

            // Convert arrays to strings
            if (Array.isArray(aValue)) aValue = aValue.join(", ");
            if (Array.isArray(bValue)) bValue = bValue.join(", ");
    
            // For numeric values, convert them to numbers before comparison
            if (!isNaN(aValue) && !isNaN(bValue)) {
                return sortOrder === 'asc' ? Number(aValue) - Number(bValue) : Number(bValue) - Number(aValue);
            }
    
            // For string values, perform case-insensitive comparison
            if (aValue && bValue) {
                return sortOrder === 'asc' ? aValue.localeCompare(bValue, 'fr', { sensitivity: 'accent' }) : bValue.localeCompare(aValue, 'fr', { sensitivity: 'accent' });
            } else {
                return 0;
            }
        });
    
        // Redisplay the Pokemons
        displayPokemons();
    }

    document.getElementById('prevButton').addEventListener('click', () => {
        currentPage--;
        displayPokemons();
    });

    document.getElementById('nextButton').addEventListener('click', () => {
        currentPage++;
        displayPokemons();
    });

    generationFilter.addEventListener('change', () => {
        currentPage = 1;
        displayPokemons();
    });
    typeFilter.addEventListener('change', () => {
        currentPage = 1;
        displayPokemons();
    });
    document.getElementById('nameFilter').addEventListener('input', () => {
        currentPage = 1;
        displayPokemons();
    });

    displayPokemons();
};

function displayPokemonDetails(pokemon) {
    // Récupérer la référence à la table
    let table = document.getElementById('pokemonTable');
    // Cacher la table
    table.style.display = 'none';

    let popup = document.getElementById('pokemonPopup');
    popup.innerHTML = ''; // Clear previous content

    let div = document.createElement('div');
    div.classList.add('popup');

    let closeButton = document.createElement('button');
    closeButton.textContent = 'Fermer';
    closeButton.addEventListener('click', () => {
        popup.style.display = 'none';
        document.body.classList.remove('blur');
        // Réafficher la table lorsque la popup est fermée
        table.style.display = 'table';
        // Réafficher les boutons PRÉC et SUIV ainsi que l'indicateur de page
        document.getElementById('prevButton').style.display = 'inline-block';
        document.getElementById('nextButton').style.display = 'inline-block';
        document.getElementById('pageInfo').style.display = 'block';
        document.getElementById('generationFilter').style.display = 'inline-block';
        document.getElementById('typeFilter').style.display = 'inline-block';
        document.getElementById('nameFilter').style.display = 'inline-block';
    });
    div.appendChild(closeButton);

    // Add Pokemon image
    let img = document.createElement('img');
    let imageUrl = `../webp/images/${pokemon._pokemon_id.toString().padStart(3, '0')}.webp`;
    img.src = imageUrl;
    img.alt = pokemon._pokemon_name;
    div.appendChild(img);

    // Add Pokemon details
    let details = document.createElement('p');
    details.textContent = `Détails du Pokémon :
        ID: ${pokemon._pokemon_id}
        Nom: ${pokemon._pokemon_name}
        Types: ${pokemon.getTypes().join(", ")}
        Endurance: ${pokemon._base_stamina}
        Points d'attaque de base: ${pokemon._base_attack}
        Points de défense de base: ${pokemon._base_defense}`;
    div.appendChild(details);

    popup.appendChild(div);
    popup.style.display = 'block';
    document.body.classList.add('blur');
    // Cacher les boutons PRÉC et SUIV ainsi que l'indicateur de page
    document.getElementById('prevButton').style.display = 'none';
    document.getElementById('nextButton').style.display = 'none';
    document.getElementById('pageInfo').style.display = 'none';
    document.getElementById('generationFilter').style.display = 'none';
    document.getElementById('typeFilter').style.display = 'none';
    document.getElementById('nameFilter').style.display = 'none';
}
