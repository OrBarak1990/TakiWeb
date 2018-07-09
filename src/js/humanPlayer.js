import Player from './player'
import {enumCard} from './enumCard'
import {setCards} from './operations'

export default class HumanPlayer extends Player{
    constructor(playerTurn){
        super("HumanPlayer",playerTurn);
        this.turnsPlayed = 0;
        this.currentTurnTime = 0;
    }

    removeCard(card) {
        for (let i = 0; i < this.allCards.length; ++i) {
            if (this.allCards[i] === card) {
                this.allCards.splice(i, 1);
            }
        }
    }

    calcCurrentTurn() {
            this.currentTurnTime += 1;
     }

    calculateAVG() {
        this.averageTimePlayed *= (this.turnsPlayed - 1);
        this.averageTimePlayed += this.currentTurnTime;
        this.averageTimePlayed /= this.turnsPlayed;
    }

    resetPlayerClock() {
        this.currentTurnTime = 0;
    }

    setAverageTimePlayed(currentAvarageTimePlayed){
        this.averageTimePlayed = currentAvarageTimePlayed;
    }

    setCards(theCards) {
        this.allCards = theCards;
        setInterval(this.calcCurrentTurn.bind(this),1000);
        super.setCardsPlace(true);
    }

    setTurnsPlayed(currentTurnsPlayed){
        this.turnsPlayed =  currentTurnsPlayed;
    }

    increasePlayerTurns() {
        this.turnsPlayed += 1;
        super.increasePlayerTurns();
    }

    doOperation(card, lastCard){
        this.removeCard(card);
        if (card.sign !== enumCard.enumTypes.TWO_PLUS)
            this.playerManagement.direction = card.direction;
        else
            this.playerManagement.direction = undefined;
        return super.doOperation(card, lastCard);
    }

    pullCardFromStock(cardsToSet) {
        setCards(this.allCards, cardsToSet);
        super.addCards(cardsToSet,true);
    }


    isDraggable(){
        return true;
    }

    isComputer() {
        return false;
    }

    clear(){
        super.clear();
        this.turnsPlayed = 0;
        this.currentTurnTime = 0;
    }

    pickColor() {
        this.playerManagement.pickColorVidibility = "visible";
        return enumCard.enumResult.CONTINUE_TURN;
    }
}