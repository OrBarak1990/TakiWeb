const PlayerManagement = require('./playerManagment');

class  StateManagement{
    constructor(){
        this.playersCards = [];
        this.playerManagement = [];
        this.openCard = undefined;
        this.stackImage = undefined;
        this.gameState =  "start";
        this.setStartGame = this.setStartGame.bind(this);
        this.setStartTournament = this.setStartTournament.bind(this);
        this.setRestartStartGame = this.setRestartStartGame.bind(this);
        this.setRestartTournamentStartGame = this.setRestartTournamentStartGame.bind(this);
        this.setQuitGame = this.setQuitGame.bind(this);
    }

    setStartGame(game, players){
        this.game = game;
        for(let i = 0; i < players; ++i)
            this.playerManagement.push(new PlayerManagement());
        this.game.setManager(this);
        this.gameState = "gaming";
        this.game.startGame();
    }

    setStartTournament(game){
        this.game = game;
        this.game.setManager(this);
        this.gameState = "gaming";
        this.game.startTournament();
    }

    renderPush(uniqueIndex){
        // this.pullCardsCallBacks.forEach(r => r.push(uniqueIndex));
    }

    renderPullCard(uniqueIndex){
        // this.pullCardsCallBacks.forEach(r => r.pull(uniqueIndex));
    }

    renderError(uniqueIndex){
        // boardsReact[uniqueIndex].renderError();
    }

    endGame(message){
        this.message = message;
        this.gameState =  "endGame";
    }

    endGameInTournament(message){
        this.message = message;
        this.gameState =  "endGameInTournament";
    }

    endTournament(message){
        this.message = message;
        this.gameState =  "endTournament";
    }

    setRestartTournamentStartGame(){
        this.game.restartTournamentGame();
        this.gameState = "gaming";
    }

    setRestartStartGame(){
        this.game.restartGame();
        this.gameState = "gaming";
    }

    setQuitGame(){
        this.game.quitGame();
    }

    next(){
        this.error = undefined;
        this.game.next();
    }

    prev(){
        this.error = undefined;
        this.game.prev();
    }

    clone(){
        let cloneState = new StateManagement();
        cloneState.playersCards = [];
        cloneState.playersCards[0] = this.playersCards[0];
        cloneState.playersCards[1] = this.playersCards[1];
        cloneState.pickColorVidibility = this.pickColorVidibility;
        cloneState.openCard = this.openCard;
        cloneState.stackImage = this.stackImage;
        cloneState.statisticsMassages = this.statisticsMassages;
        cloneState.gameState =  "endGame";
        cloneState.message = this.message;
        cloneState.error = this.error;
        cloneState.game = this.game;
        cloneState.boardReact = this.boardReact;
        return cloneState;
    }

    takeValues(state){
        this.playersCards[0] = state.playersCards[0];
        this.playersCards[1] = state.playersCards[1];
        this.pickColorVidibility = state.pickColorVidibility;
        this.openCard = state.openCard;
        this.stackImage = state.stackImage;
        this.statisticsMassages = state.statisticsMassages;
        this.message = state.message;
        this.error = state.error;
    }
}

    module.exports = StateManagement;