export default class  StateManagement{
    constructor(){
        this.playersCards = [];
        this.pickColorVidibility = "hidden";
        this.openCard = undefined;
        this.stackImage = undefined;
        this.statisticsMassages = undefined;
        this.gameState =  "start";
        this.openCardAnm = false;
        this.stackCards = [];
        this.message = [];
        this.error = undefined;
        this.direction = undefined;
        this.setStartGame = this.setStartGame.bind(this);
        this.setStartTournament = this.setStartTournament.bind(this);
        this.setRestartStartGame = this.setRestartStartGame.bind(this);
        this.setRestartTournamentStartGame = this.setRestartTournamentStartGame.bind(this);
        this.setQuitGame = this.setQuitGame.bind(this);
    }

    setStartGame(boardReact, game){
        this.boardReact = boardReact;
        this.game = game;
        this.game.setManager(this);
        this.gameState = "gaming";
        this.game.startGame();
    }

    setStartTournament(boardReact, game){
        this.boardReact = boardReact;
        this.game = game;
        this.game.setManager(this);
        this.gameState = "gaming";
        this.game.startTournament();
    }

    renderGame(){
        this.boardReact.changeSate(this.gameState);
    }

    endGame(message){
        this.message = message;
        this.gameState =  "endGame";
        this.boardReact.changeSate(this.gameState);
    }

    endGameInTournament(message){
        this.message = message;
        this.gameState =  "endGameInTournament";
        this.boardReact.changeSate(this.gameState);
    }

    endTournament(message){
        this.message = message;
        this.gameState =  "endTournament";
        this.boardReact.changeSate(this.gameState);
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

