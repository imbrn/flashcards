/**
 * Represents a flashcard model.
 */
class Card {

    constructor(front, back) {
        this._front = front;
        this._back = back;
    }

    clone() {
        return new Card(this.front, this.back);
    }

    mutate(properties) {
        const front_clone = properties && properties.front !== undefined ? properties.front : this._front;
        const back_clone = properties && properties.back !== undefined ? properties.back : this._back;
        return new Card(front_clone, back_clone);
    }

    get front() {
        return this._front;
    }

    get back() {
        return this._back;
    }

    compare(other) {
        if (other === undefined || other === null) return false;
        return other.front === this.front && other.back === this.back;
    }

}

export default Card;
