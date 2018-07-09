import HumanPlayer from './humanPlayer'
import SmartComputer from './smartComputer'
import statistics from './statistics'
import {stack} from './stack'
import {enumCard} from './enumCard'
import {setCards, takiPermission, takeCards, getUniqueCss} from './operations'

export default class Game{

    constructor(){
        this.gameCards = [];
        this.turn = 0;
        this.players = [new HumanPlayer(0), new SmartComputer(1)];
        this.amountOfCardsToTakeFromStock = 1;
        this.endGame = false;
        this.tournament = false;
        this.computerOperation = this.computerOperation.bind(this);
        this.prev = this.prev.bind(this);
        this.next = this.next.bind(this);
    }
    
    changeTurn(promote, dropAnm) {
        this.players[this.turn].increasePlayerTurns();
        this.players[this.turn].calculateAVG();
        this.players[this.turn].resetPlayerClock();
        this.turn = (this.turn + promote) % this.players.length;
        this.gameStatistics.updateStatistics(this.turn);
        this.render(dropAnm);
    }

    calcAmountCardsToTake(card) {
        if (card.getSign() === enumCard.enumTypes.TWO_PLUS) {
            if (this.amountOfCardsToTakeFromStock % 2 === 0)
                this.amountOfCardsToTakeFromStock += 2;
            else
                this.amountOfCardsToTakeFromStock = 2;
        } else
            this.amountOfCardsToTakeFromStock = 1;
    }

    partition() {
        let gameStartCard = stack.getValidOpenCard();
        setCards(this.gameCards, gameStartCard);
        this.stateManagement.openCard = {image: gameStartCard[0].uniqueCardImage, id: gameStartCard[0].id};
        this.players.forEach(p => p.setCards(stack.getCards(8), this.players.length));
    }

    colorPicked(pickedColor) {
        this.stateManagement.direction = undefined;
        this.stateManagement.openCardAnm = false;
        this.stateManagement.pickColorVidibility = "hidden";
        this.gameCards[this.gameCards.length - 1].setColor(pickedColor);
        this.gameCards[this.gameCards.length - 1].setImage(getUniqueCss(Object.keys(enumCard.enumColor)[pickedColor],
            Object.keys(enumCard.enumTypes)[enumCard.enumTypes.CHANGE_COLOR], '_'));
        this.stateManagement.openCard =
            {image: this.gameCards[this.gameCards.length - 1].uniqueCardImage, id: this.gameCards[this.gameCards.length - 1].id};
        this.changeTurn(enumCard.enumResult.NEXT_TURN, false);
        setTimeout(this.computerOperation, 2200);
    }

    setDrop(id){
        let card = this.players[this.turn].getCard(id);
        if (card !== undefined) {
            this.dropValidation(card);
        }
    }

    dropValidation(card) {
        if (takiPermission(this.players[this.turn], card) && card.doValidation(this.gameCards[this.gameCards.length - 1])) {
            let promote = this.players[this.turn].doOperation(card, this.gameCards[this.gameCards.length - 1]);
            this.gameCards[this.gameCards.length - 1].setActive(false);
            this.gameCards.push(card);
            this.stateManagement.openCard = {image: card.uniqueCardImage, id: card.id};
            this.calcAmountCardsToTake(card);
            if (this.players[this.turn].getAmountOfCards() === 0 && card.getSign() !== enumCard.enumTypes.PLUS) {
                this.endGameMode(Object.keys(enumCard.enumPlayer)[this.turn]);
            }else {
                this.stateManagement.openCardAnm = true;
                if (promote !== enumCard.enumResult.CONTINUE_TURN)
                    this.changeTurn(promote, true);
                else{
                    this.render(true);
                }
            }
            setTimeout(this.computerOperation, 2200);
        }else{
            this.stateManagement.openCardAnm = false;
            if(!takiPermission(this.players[this.turn], card))
                this.renderError(enumCard.enumErrors.CARD_NOT_IN_TAKI);
            else
                this.renderError(enumCard.enumErrors.CARD_NOT_AUTHORIZED);
        }
    }

    refreshStockAndOpenCards() {
        if (this.gameCards.length === 1) {

            this.endGameMode("TIE! nobody ");
        } else {
            let lastCard = this.gameCards.pop();
            stack.initializeStock(this.gameCards);
            this.gameCards = undefined;
            this.gameCards = [];
            this.gameCards.push(lastCard);
            this.stateManagement.openCard = {image: lastCard.uniqueCardImage, id: lastCard.id};
            this.stateManagement.stackImage = stack.getStackImage();
        }
    }

    pullCardValidation(player) {
        this.stateManagement.direction = undefined;
        this.stateManagement.openCardAnm = false;
        if (player === this.players[this.turn] && player.pullApproval(this.gameCards[this.gameCards.length - 1])) {
            this.stateManagement.stackImage = stack.getStackImage();
            this.stateManagement.pullCardAnimation = true;
            this.gameCards[this.gameCards.length - 1].setActive(false);
            player.setTakiMode(undefined);
            let cardsFromStock = stack.getCards(this.amountOfCardsToTakeFromStock);
            if (stack.getLength() <= this.amountOfCardsToTakeFromStock) {
                this.refreshStockAndOpenCards();
            }
            this.amountOfCardsToTakeFromStock = 1;
            this.stateManagement.pullCardAnimation = true;
            player.pullCardFromStock(cardsFromStock);
            this.changeTurn(enumCard.enumResult.NEXT_TURN, false);
            setTimeout(this.computerOperation, 2200);
        }
        else{
            if(player !== this.players[this.turn])
                this.renderError(enumCard.enumErrors.PULL_CARD_NOT_IN_TURN);
            else
                this.renderError(enumCard.enumErrors.PULL_CARD_WITH_AVAILABLE_CARD);
        }
    }

    computerOperation() {
        if (!this.endGame && this.players[this.turn].isComputer()) {
            this.stateManagement.openCardAnm = true;
            if (this.players[this.turn].colorToPick()) {
                let color = this.players[this.turn].getColor();
                this.colorPicked(color);
            } else {
                let card = this.players[this.turn].pickCard(this.gameCards[this.gameCards.length - 1]);
                if (card === undefined)
                    this.pullCardValidation(this.players[this.turn]);
                else {
                    this.dropValidation(card);
                }
            }
        }
    }

    getGameCards() {
        let allCards = [];
        takeCards(allCards, this.players[0].getAllCards());
        takeCards(allCards, this.players[1].getAllCards());
        takeCards(allCards, this.gameCards);
        return allCards;
    }

    initialGameAndStatistics() {
        this.turn = 0;
        this.partition();
        this.gameStatistics = new statistics(this.players);
        this.gameStatistics.setManager(this.stateManagement);
        this.gameStatistics.updateStatistics(0);
        this.stateManagement.stackImage = stack.getStackImage();
        this.stateManagement.pickColorVidibility = "hidden";
        if(!this.tournament) {
            this.savesStates = [];
        }
        this.stateManagement.renderGame();
    }

    startGame() {
        stack.setGame();
        this.initialGameAndStatistics();
        setTimeout(this.computerOperation, 2200);
    }

    startTournament(){
        this.tournament = true;
        this.gameNumber = 0;
        this.startGame();
    }

    restartTournamentGame(){
        this.stateManagement.openCardAnm = false;
        this.players.forEach(player => {
            player.score = 0;
        });
        this.tournament = true;
        this.gameNumber = 0;
        this.renderError();
        this.restartGame();
    }

    restartGame() {
        this.stateManagement.openCardAnm = false;
        this.endGame = false;
        let allCards;
        allCards = this.getGameCards();
        let playerAverageTurnTime = this.players[0].getAverageTimePlayed();
        let playerTurn = this.players[0].getTurnsPlayed();
        this.players[0].clear();
        this.players[1].clear();
        this.gameCards = undefined;
        this.gameCards = [];
        stack.initializeStock(allCards);
        this.gameStatistics = undefined;
        this.players[0].setAverageTimePlayed(playerAverageTurnTime);
        this.players[0].setTurnsPlayed(playerTurn);
        this.renderError();
        this.initialGameAndStatistics();
        setTimeout(this.computerOperation, 2200);
    }


    tournamentGameEnd(message) {
        this.stateManagement.error = undefined;
        let score = this.players[(this.turn + 1) % this.players.length].calcScore();
        this.players[this.turn].updateTournamentScore(score);
        this.gameNumber++;
        if(this.gameNumber === 3){
            this.endTournament(message);
        }else
            this.stateManagement.endGameInTournament(message);
    }

    endTournament(message){
        let messages = [];
        messages.push(message);
        if(this.players[this.turn].getScore() > this.players[(this.turn + 1) % this.players.length].score) {
            messages.push("The winner is: " + this.players[this.turn].name);
            messages.push("Winner's score: " + this.players[this.turn].getScore());
            messages.push("Loser's score: " + this.players[(this.turn + 1) % this.players.length].getScore());
        }
        else{
            messages.push("The winner is: " + this.players[(this.turn + 1) % this.players.length].name);
            messages.push("Winner's score: " + this.players[(this.turn + 1) % this.players.length].getScore());
            messages.push("Loser's score: " + this.players[this.turn].getScore());
        }
        this.tournament = false;
        this.stateManagement.endTournament(messages);
    }

    prev(){
        if(this.turnIndex -1 >= 0) {
            this.stateManagement.takeValues(this.savesStates[--this.turnIndex]);
        }else{
            this.stateManagement.message = [];
            this.stateManagement.error = "start game window";
        }
        this.stateManagement.renderGame();
    }

    next(){
        if(this.turnIndex + 1 < this.savesStates.length) {
            this.stateManagement.takeValues(this.savesStates[++this.turnIndex]);
        }else {
            this.stateManagement.message = [];
            this.stateManagement.error = "end game window";
        }
        this.stateManagement.renderGame();
    }

    endGameMode(message) {
        let newMsg = [];
        newMsg[0] = message + " win!";
        this.stateManagement.error = undefined;
        if(this.tournament)
            this.tournamentGameEnd(newMsg);
        else {
            if(this.quitMode === undefined) {
                this.savesStates.push(this.stateManagement.clone());
            }
            this.turnIndex = this.savesStates.length - 1;
            this.endGame = true;
            this.stateManagement.endGame(newMsg);
        }
    }

    quitGame() {
        if(this.turn === this.players[0].turn) {
            this.quitMode = true;
            if (this.tournament) {
                this.turn = (this.turn + 1) % this.players.length;
                this.tournamentGameEnd("Player quit! Computer Win!");
            }
            else {
                this.endGameMode("PLAYER quit! COMPUTER");
            }
        }
    }

    setManager(stateManagement) {
        this.stateManagement = stateManagement;
        this.players[0].setManager(stateManagement, 0);
        this.players[1].setManager(stateManagement, 1);
    }

    render(dropAnm) {
        this.stateManagement.openCardAnm = dropAnm;
        this.stateManagement.error = undefined;
        if(!this.tournament && this.stateManagement.stackCards.length === 0)
            this.savesStates.push(this.stateManagement.clone());
        this.stateManagement.renderGame();
    }

    animationCardEnd(){
        this.stateManagement.stackCards.splice(0, 1);
        if(this.stateManagement.stackCards.length === 0 && !this.stateManagement.renderAnimationEnd)
            this.renderAnimation();
    }

    renderAnimation(){
        this.stateManagement.message = undefined;
        this.players.forEach(p => p.updateCardsToAdd());
        if(!this.tournament)
            this.savesStates.push(this.stateManagement.clone());
        this.stateManagement.renderAnimationEnd = true;
        this.stateManagement.renderGame();
    }

    renderError(error){
        this.stateManagement.openCardAnm = false;
        this.stateManagement.error = error;
        this.stateManagement.direction = undefined;
        this.stateManagement.renderGame();
    }
}