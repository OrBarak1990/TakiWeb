// import Card from "./card";
// import {enumCard} from './enumCard'
const {enumCard} = require('./enumCard');
const Card = require('./card');

class TwoPlus extends Card{

    constructor(theColor, theSign, theId){
        super(theColor, theSign, theId,10);
        this.direction = enumCard.enumActionDirection.TWO_PLUS;
    }

    doOperation() {
        this.setActive(true);
        return enumCard.enumResult.NEXT_TURN;
    }

    doValidation(lastCard) {
        return (lastCard.getColor() === this.getColor() || lastCard.getSign() === this.getSign());
    }
}

module.exports = TwoPlus;