// import {enumCard} from './enumCard'
const {enumCard} = require('./enumCard');

class Card{

    constructor (theColor, theSign, theId, theScore){
        this.color = theColor;
        this.sign = theSign;
        this.active = false;
        this.id = theId;
        this.score = theScore;
        this.uniqueCardImage = undefined;
    }

    setUniqueImage(imgName) {
        this.uniqueCardImage = imgName.toLowerCase() + ".png";
    }

    isActive (){
        return this.active;
    }

    getId() {
        return this.id;
    }

    setElement (theUniqueCard) {
        this.setUniqueImage(theUniqueCard);
    };

    getSign (){
        return this.sign;
    };

    getColor () {
        return this.color;
    };

    setColor(theColor) {
        this.color = theColor;
    };

    setImage(imgName) {
        this.setUniqueImage(imgName);
    };

    setActive(activeness) {
        this.active = activeness;
    };
}

module.exports = Card;