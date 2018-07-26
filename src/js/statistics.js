// import {enumCard} from './enumCard'
const {enumCard} = require('./enumCard');

class statistics {
    
    constructor(thePlayersGame){
        this.playersGame = thePlayersGame;
        this.turnsCounter = -1;
        this.singleCardPlayers = [];
    }
     updateStatistics(turn) {
        this.turnsCounter++;
         let playerTurnName = "Current player turn: " + this.playersGame[turn].name;
         for (let i = 0; i < this.playersGame.length; ++i) {
             let messages = [];
             messages[0] = "\n" + "Turns played totally :" + this.turnsCounter;
             messages.push(playerTurnName);
             this.singleCardPlayers[i] = this.playersGame[i].getSingleCardCounter();
             let playerLocal = this.playersGame[i].name + ": ";
             messages.push(playerLocal);
             playerLocal = "Turns played: " + this.playersGame[i].getTurnsPlayed();
             messages.push(playerLocal);
             playerLocal = "Single cards times: " + this.playersGame[i].getSingleCardCounter();
             messages.push(playerLocal);
             playerLocal = "Average turn time: " + Math.round(this.playersGame[i].getAverageTimePlayed() * 100) / 100 + " sec";
             messages.push(playerLocal);
             let id =this.playersGame[i].id;
             this.manager.playerManagement[id].statisticsMassages = [];
             this.manager.playerManagement[id].statisticsMassages = messages;
         }
/*
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

         this.manager.playerManagement.forEach(p => p.statisticsMassages = []);
         this.manager.playerManagement.forEach(p => p.statisticsMassages = messages);



     }
*/



     }

     setManager(statisticsManager) {
         this.manager = statisticsManager;
     }
}

module.exports = statistics;