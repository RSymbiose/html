class class_pokemon {
    static all_pokemons = {};
    constructor(pokemon_id, pokemon_name, base_attack, base_defense, base_stamina, pokemon_generation) {
            this._pokemon_id = pokemon_id;
            this._pokemon_name = pokemon_name;
            this._base_attack = base_attack
            this._base_defense = base_defense
            this._base_stamina = base_stamina
            this._pokemon_generation = pokemon_generation
            this._types = new Array();
            this._attack = new Array();
    }
    get pokemon_id() {
        return this._pokemon_id;
    }

    get pokemon_name() {
        return this._pokemon_name;
    }

    get form() {
        return this._form;
    }

    get base_attack() {
        return this._base_attack;
    }

    get base_defense() {
        return this._base_defense;
    }

    get base_stamina() {
        return this._base_stamina;
    }

    get pokemon_generation() {
        return this._pokemon_generation;
    }

    getTypes() {
        return this._types;
    }
    

    getAttacks() {
        const tabAtk = this._attack.map(atk => class_attack.all_attacks[atk]);
        return tabAtk;
    }    

    setlisteattack(attack) {
        this._attack.push(attack);
    }

    setlistetype(type) {
        this._types.push(type);
    }
    


    toString() {
        if (this._pokemon_id !== null) {
            const types = this._types.join(", ");
            return `ID du Pokémon : ${this._pokemon_id}
                    Nom du Pokémon : ${this._pokemon_name}
                    Types : ${types}
                    Base d'attaque : ${this._base_attack}
                    Base de défense : ${this._base_defense}
                    generation : ${this._pokemon_generation}
                    Base de stamina : ${this._base_stamina}`;
        } else {
            return "Ce Pokémon n'a pas la forme 'Normal'.";
        }
    }

    static import_pokemon(){
        //ajout des pokemons
        pokemons.filter(poke => poke.form === "Normal").forEach(poke => {
            let Poke = new class_pokemon(poke.pokemon_id, poke.pokemon_name, poke.base_attack, poke.base_defense, poke.base_stamina);
            class_pokemon.all_pokemons[poke.pokemon_id] = Poke;

            // Ajout des types au Pokémon
            pokemon_type.filter(typeid => typeid.form === "Normal" && typeid.pokemon_id === poke.pokemon_id).forEach(typeid => {
                Poke.setlistetype(typeid.type);
            });
        });

        let moves = fast_moves.concat(charged_moves);

        //ajout des génération
        for (let genName in generation) {
            let genPokemons = generation[genName];
            genPokemons.forEach(pokemon => {
                if (pokemon.id in class_pokemon.all_pokemons) {
                    class_pokemon.all_pokemons[pokemon.id]._pokemon_generation = pokemon.generation_number;
                }
            });
        }

        //ajout des attaques
        moves.forEach(move => {
            if (Object.values(class_attack.all_attacks).some(attack => attack.nom === move.name)) {
                console.log("L'attaque existe déjà :", move.name);
                return;
            } else {
                pokemon_moves.filter(moveid => moveid.form === "Normal").forEach(moveid => {
                    if (moveid.charged_moves.includes(move.name) || moveid.elite_charged_moves.includes(move.name) || moveid.fast_moves.includes(move.name) || moveid.move_name === move.name) {
                        class_pokemon.all_pokemons[moveid.pokemon_id].setlisteattack(move.move_id);
                    }
                });
            }

            let Atk = new class_attack(move.move_id, move.name, move.type, move.power, move.duration, move.energy_delta, move.stamina_loss_scaler, move.critical_chance);
            class_attack.all_attacks[move.move_id] = Atk;
        });


        // Ajout des types
        for (let typeName in type_effectiveness) {
            let efficacy = type_effectiveness[typeName];
            let type = new class_type(typeName, efficacy);
            
            if (typeName in class_type.all_types) {
            } else {
                class_type.all_types[typeName] = type;
                pokemon_type.filter(typeid => typeid.form === "Normal").forEach(typeid => {
                    if (typeid.type.includes(typeName)) {
                        class_pokemon.all_pokemons[typeid.pokemon_id].setlistetype(type._type_name);
                    }
                });
            } 
        }

    }

}
