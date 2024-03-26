class class_type {

    static all_types = {};
    constructor(nom, efficience) {
            this._type_name = nom;
            this._effective = efficience;
    }

    calculateWeakness() {
        const weaknessArray = Object.entries(this._effective_against)
            .filter(([type, effectiveness]) => effectiveness < 1)
            .map(([type, effectiveness]) => type);

        return weaknessArray;
    }

    toString() {
        return this._type_name;
    }

}