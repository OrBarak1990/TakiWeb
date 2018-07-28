// import {enumCard} from './enumCard'
const {enumCard} = require('./enumCard');

class statistics {

    constructor(thePlayersGame) {
        this.playersGame = thePlayersGame;
        this.legacyPlayers = [];
        this.turnsCounter = -1;
        this.singleCardPlayers = [];
    }

 /*   updateStatistics(turn, cardLength) {
        this.turnsCounter++;
        let playerTurnName = "Current player turn: " + this.playersGame[turn].name;
        let amountOfCardsInStack = "Amount cards In stack: " + cardLength;
        for (let i = 0; i < this.playersGame.length; ++i) {
            let messages = [];
            messages[0] = "\n" + "Turns played totally :" + this.turnsCounter;
            messages.push(playerTurnName);
            messages.push(amountOfCardsInStack);
            // this.manager.playerManagement[i].state == "stopGame"
            // let indexTurn = this.manager.playerManagement[i].turn;
            // this.singleCardPlayers[i] = this.playersGame[indexTurn].getSingleCardCounter();
            this.singleCardPlayers[i] = this.playersGame[i].getSingleCardCounter();
            let playerLocal = this.playersGame[i].name + ": ";
            messages.push(playerLocal);
            playerLocal = "Turns played: " + this.playersGame[i].getTurnsPlayed();
            messages.push(playerLocal);
            playerLocal = "Single cards times: " + this.playersGame[i].getSingleCardCounter();
            messages.push(playerLocal);
            playerLocal = "Average turn time: " + Math.round(this.playersGame[i].getAverageTimePlayed() * 100) / 100 + " sec";
            messages.push(playerLocal);
            let id = this.playersGame[i].id;
            this.manager.playerManagement[id].statisticsMassages = [];
            this.manager.playerManagement[id].statisticsMassages = messages;
        }
    }
*/

    updateStatistics(turn, cardLength) {
        this.turnsCounter++;
        let playerTurnName = "Current player turn: " + this.playersGame[turn].name;
        let amountOfCardsInStack = "Amount cards In stack: " + cardLength;
        for (let i = 0; i < this.manager.playerManagement.length; ++i) {
            let messages = [];
            messages[0] = "\n" + "Turns played totally :" + this.turnsCounter;
            messages.push(playerTurnName);
            messages.push(amountOfCardsInStack);
            let indexTurn = this.manager.playerManagement[i].turn;
            if(this.manager.playerManagement[i].gameState !== "stopGaming") {
                let playerLocal = this.playersGame[indexTurn].name + ": ";
                messages.push(playerLocal);
                playerLocal = "Turns played: " + this.playersGame[indexTurn].getTurnsPlayed();
                messages.push(playerLocal);
                playerLocal = "Single cards times: " + this.playersGame[indexTurn].getSingleCardCounter();
                messages.push(playerLocal);
                playerLocal = "Average turn time: " + Math.round(this.playersGame[indexTurn].getAverageTimePlayed() * 100) / 100 + " sec";
                messages.push(playerLocal);
            }
            // let id = this.playersGame[i].id;
            this.manager.playerManagement[i].statisticsMassages = [];
            this.manager.playerManagement[i].statisticsMassages = messages;
        }
    }

/*    allPlayersStatistics() {
        let messages = [];
        this.turnsCounter++;
        messages[0] = "\n" + "Turns played totally :" + this.turnsCounter;
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

        this.manager.allStatisticsMassages = [];
        this.manager.playerManagement.forEach(p => p.allStatisticsMassages = messages);
        this.manager.viewerManagement.forEach(v => v.allStatisticsMassages = messages);
        // this.manager.allStatisticsMassages = messages;
    }*/

    allPlayersStatistics() {
        let messages = [];
        this.turnsCounter++;
        messages[0] = "\n" + "Turns played totally :" + this.turnsCounter;
        for (let i = 0; i < this.playersGame.length; ++i) {
            let playerLocal = this.playersGame[i].name;
            messages.push(playerLocal);
            playerLocal = "Turns played: " + this.playersGame[i].getTurnsPlayed();
            messages.push(playerLocal);
            playerLocal = "Single cards times: " + this.playersGame[i].getSingleCardCounter();
            messages.push(playerLocal);
            playerLocal = "Average turn time: " + Math.round(this.playersGame[i].getAverageTimePlayed() * 100) / 100 + " sec";
            messages.push(playerLocal);
        }

        for (let i = 0; i < this.legacyPlayers.length; ++i) {
            let playerLocal = this.legacyPlayers[i].name;
            messages.push(playerLocal);
            playerLocal = "Turns played: " + this.legacyPlayers[i].turnsPlayed;
            messages.push(playerLocal);
            playerLocal = "Single cards times: " + this.legacyPlayers[i].singleCardCounter;
            messages.push(playerLocal);
            playerLocal = "Average turn time: " + Math.round(this.legacyPlayers[i].averageTimePlayed * 100) / 100 + " sec";
            messages.push(playerLocal);
        }

        this.manager.allStatisticsMassages = [];
        this.manager.playerManagement.forEach(p => p.allStatisticsMassages = messages);
        this.manager.viewerManagement.forEach(v => v.allStatisticsMassages = messages);
        // this.manager.allStatisticsMassages = messages;
    }

    setManager(statisticsManager) {
        this.manager = statisticsManager;
    }
}

module.exports = statistics;