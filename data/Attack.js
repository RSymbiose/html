class Attack {
    constructor(move_id, name, type, power, duration, energy_delta, stamina_loss_scaler, critical_chance) {
        this._move_id = move_id;
        this._name = name;
        this._type = type;
        this._power = power;
        this._duration = duration;
        this._energy_delta = energy_delta;
        this._stamina_loss_scaler = stamina_loss_scaler;
        this._critical_chance = critical_chance;
    }

    get move_id() {
        return this._move_id;
    }

    get name() {
        return this._name;
    }

    get type() {
        return this._type;
    }

    get power() {
        return this._power;
    }

    get duration() {
        return this._duration;
    }

    get energy_delta() {
        return this._energy_delta;
    }

    get stamina_loss_scaler() {
        return this._stamina_loss_scaler;
    }

    get critical_chance() {
        return this._critical_chance;
    }

    toString() {
        return `Attaque : ${this._name}
        Type : ${this._type}
        Puissance : ${this._power}
        Durée : ${this._duration}
        Delta d'énergie : ${this._energy_delta}
        Taux de perte de stamina : ${this._stamina_loss_scaler}
        Chance critique : ${this._critical_chance}`;
    }
}

Attack.all_attacks = {};
