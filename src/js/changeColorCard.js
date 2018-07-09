import Card from "./card";
import {enumCard} from './enumCard'

export default class ChangeColorCard extends Card{

    constructor(theColor, theSign, theId){
        super(theColor, theSign, theId, 15);
        this.direction = enumCard.enumActionDirection.CHANGE_COLOR;
    }

    doOperation(player) {
        return player.pickColor();
    }

    doValidation(lastCard) {
        return !lastCard.isActive();
    }
}