// script_v3.js
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

        document.getElementById('pageInfo').textContent = `Page ${currentPage} de ${Math.ceil(allPokemons.length / pokemonsPerPage)}`;

        document.getElementById('prevButton').disabled = currentPage === 1;
        document.getElementById('nextButton').disabled = endIndex >= allPokemons.length;
    }

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