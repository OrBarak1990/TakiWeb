// import Card from "./card";
// import {enumCard} from './enumCard'
const Card = require('./card');
const {enumCard} = require('./enumCard');

class Plus extends Card{

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

module.exports = Plus;