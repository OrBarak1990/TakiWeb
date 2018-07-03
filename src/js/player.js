import {enumCard} from './enumCard'
import {takiModeChecker} from './operations'

export default class Player{
    constructor(theName,theTurn){
        this.allCards = [];
        this.singleCardCounter = 0;
        this.score = 0;
        this.averageTimePlayed = 0;
        this.turnsPlayedForStatistics = 0;
        this.takiMode = undefined;
        this.name = theName;
        this.turn = theTurn;
    }

    setManager(playerManagement, index){
        this.playerManagement = playerManagement;
        this.playerIndex = index;
    }

    increasePlayerTurns(){
        this.turnsPlayedForStatistics += 1;
    }

    pullApproval(lastCard){
        let answer = true;
        this.allCards.some(card =>{
           if(card.doValidation(lastCard)) {
               answer = false;
               return true;
           }
        });
        return answer;
    }

    getCard(id) {
        let cardToReturn = undefined;
        this.allCards.some(card => {
            if (card.getId().toString() === id) {
                cardToReturn = card;
                return true;
            }
        });

        return cardToReturn;
    }

    clear(){
        this.allCards = [];
        this.singleCardCounter = 0;
        this.averageTimePlayed = 0;
        this.turnsPlayedForStatistics = 0;
        this.takiMode = undefined;
    }

    getTurnsPlayed(){
        return this.turnsPlayedForStatistics;
    }

    getAmountOfCards(){
        return this.allCards.length;
    }

    setTakiMode(card) {
        this.takiMode = card;
    }

    getAllCards(){
        return this.allCards;
    }

    getTakiMode() {
        return this.takiMode;
    }

    getAverageTimePlayed(){
        return this.averageTimePlayed;
    }

    setCardsPlace(humanAnimation){
        this.playerManagement.playersCards[this.playerIndex] = [];
        this.addCards(this.allCards, humanAnimation);
    }

    addCards(cardsToAdd, humanAnimation) {
        this.playerManagement.stackCards.push({humanAnimation: humanAnimation, id: cardsToAdd[0].id});
        this.playerManagement.renderAnimationEnd = false;
        this.saveCardsToAdd = cardsToAdd;
    }

    updateCardsToAdd() {
        if(this.saveCardsToAdd !== undefined){
            this.saveCardsToAdd.forEach(card => {
                this.playerManagement.playersCards[this.playerIndex].push({image: card.uniqueCardImage, id: card.id});
            });
            this.saveCardsToAdd = undefined;
        }
    }

    getSingleCardCounter(){
        return this.singleCardCounter;
    }


    doOperation(card, lastCard) {
        for(let i = 0; i < this.playerManagement.playersCards[this.playerIndex].length; ++i){
            if (this.playerManagement.playersCards[this.playerIndex][i].id === card.id) {
                this.playerManagement.playersCards[this.playerIndex].splice(i, 1);
                break;
            }
        }

        let promote = card.doOperation(this, lastCard);
        if (this.takiMode !== undefined) {
            if(takiModeChecker(this.allCards, this.takiMode)) {
                promote = enumCard.enumResult.CONTINUE_TURN;
                card.setActive(false);
            }
            else{
                this.takiMode = undefined;
                if(promote === enumCard.enumResult.CONTINUE_TURN)
                    promote = enumCard.enumResult.NEXT_TURN;
            }
        }
        if (this.allCards.length === 1)
            this.singleCardCounter++;
        return promote;
    }

    calcScore(){
      let score = 0;
        this.allCards.forEach(card => {
            score += card.score;
        });
      return score;
    }

    updateTournamentScore(playerScore){
        this.score += playerScore;
    }

    getScore(){
        return this.score;
    }
}