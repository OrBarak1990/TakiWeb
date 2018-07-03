import Card from "./card";
import {enumCard} from './enumCard'

export default class Plus extends Card{

    constructor(theColor, theSign, theId){
        super(theColor, theSign, theId,10);
        this.direction = enumCard.enumActionDirection.PLUS;
    }

    doOperation() {
        return enumCard.enumResult.EXTRA_TURN;
    }

    doValidation(lastCard) {
        return !lastCard.isActive() && (lastCard.getColor() === this.getColor() || lastCard.getSign() === this.getSign());
    }
}