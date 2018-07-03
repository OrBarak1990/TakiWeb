import {enumCard} from './enumCard'
export default class statistics {
    
    constructor(thePlayersGame){
        this.playersGame = thePlayersGame;
        this.turnsCounter = -1;
        this.singleCardPlayers = [];
    }
     updateStatistics(turn) {
        let messages = [];
        this.turnsCounter++;
         messages[0] = "\n" + "Turns played totally :" + this.turnsCounter;
         let playerTurnName = "Current player turn: " + this.playersGame[turn].name;
         messages.push(playerTurnName);
         for (let i = 0; i < this.playersGame.length; ++i) {
             this.singleCardPlayers[i] = this.playersGame[i].getSingleCardCounter();
             let playerLocal = Object.keys(enumCard.enumPlayer)[i];
             messages.push(playerLocal);
             playerLocal = "Turns played: " + this.playersGame[i].getTurnsPlayed();
             messages.push(playerLocal);
             playerLocal = "Single cards times: " + this.playersGame[i].getSingleCardCounter();
             messages.push(playerLocal);
             playerLocal = "Average turn time: " + Math.round(this.playersGame[i].getAverageTimePlayed() * 100) / 100 + " sec";
             messages.push(playerLocal);
         }
         this.manager.statisticsMassages = messages;
     }

     setManager(statisticsManager) {
         this.manager = statisticsManager;
     }
}