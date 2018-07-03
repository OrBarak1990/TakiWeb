import Card from "./card";
import {enumCard} from './enumCard'

export default class NumberCard extends Card{

    constructor(theColor, theSign, theId, theScore){
        super(theColor, theSign, theId, theScore);
    }

    doOperation() {
        return enumCard.enumResult.NEXT_TURN;
    }

    doValidation(lastCard) {
        return !lastCard.isActive() && (lastCard.getColor() === this.getColor() || lastCard.number === this.number);
    }
}

