class  PlayerManagement{
    constructor(){
        this.pickColorVidibility = "hidden";
        this.statisticsMassages = undefined;
        this.openCardAnm = false;
        this.stackCards = [];
        this.message = [];
        this.error = undefined;
        this.direction = undefined;
        this.savesStates = [];
    }

    endGame(){
        this.turnIndex = this.savesStates.length - 1;
    }
}

module.exports = PlayerManagement;