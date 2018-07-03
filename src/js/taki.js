import Card from "./card";
import {enumCard} from './enumCard'
export default class Taki extends Card{

    constructor(theColor, theSign, theId){
        super(theColor, theSign, theId,15);
        this.direction = enumCard.enumActionDirection.TAKI;
    }

    doOperation(player) {
        player.setTakiMode(this);
        return enumCard.enumResult.CONTINUE_TURN;
    }

    doValidation(lastCard) {
        return !lastCard.isActive() && (lastCard.getColor() === this.getColor());
    }
}