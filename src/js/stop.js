import Card from "./card";
import {enumCard} from './enumCard'
export default class Stop extends Card{

    constructor(theColor, theSign, theId){
        super(theColor, theSign, theId,10);
        this.direction = enumCard.enumActionDirection.STOP;
    }

    doOperation() {
        return enumCard.enumResult.JUMP_TURN;
    }

    doValidation(lastCard) {
        return !lastCard.isActive() && (lastCard.getColor() === this.getColor() || lastCard.getSign() === this.getSign());
    }
}
