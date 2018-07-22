class  PlayerManagement{
    constructor(){
        this.pickColorVidibility = "hidden";
        this.statisticsMassages = undefined;
        this.openCardAnm = false;
        this.stackCards = [];
        this.message = [];
        this.error = [];
        this.direction = [];
        this.savesStates = [];
        this.gameState = "start";
    }

    endGame(){
        this.turnIndex = this.savesStates.length - 1;
    }

    clone(){
        let clonePlayerState = new PlayerManagement();
        clonePlayerState.pickColorVidibility = this.pickColorVidibility;
        clonePlayerState.statisticsMassages = this.statisticsMassages;
        clonePlayerState.message = this.message;
        clonePlayerState.gameState =  "endGame";
        /*clonePlayerState.playerManagement.error = this.error;*/
        return clonePlayerState;
    }
}

module.exports = PlayerManagement;