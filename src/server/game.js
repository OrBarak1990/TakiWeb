const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const auth = require('./authUsers');
const authBoard = require('./authBoard');
const game = require('./../js/game');
const stateManagement = require('./../js/stateManagement');

const gameManagement = express.Router();

gameManagement.use(bodyParser.text());


gameManagement.post('/',[
    auth.userAuthentication,
    /*authBoard.boardAuthentication,*/
    (req, res) => {
        const body = JSON.parse(req.body);
        const boardDetail = authBoard.getBoardDetail(body.gameName);
        boardDetail.active = true ;
        if (boardDetail.game === undefined) {
            boardDetail.game = new game(boardDetail.users, boardDetail.computer);
            boardDetail.stateManagement = new stateManagement();
            boardDetail.stateManagement.setStartGame(boardDetail.game, boardDetail.numOfPlayers);
            boardDetail.chatContent = [];
        }

        const userName = auth.getUserInfo(req.session.id).name;
        let uniqueId;
        for (let i = 0; i < boardDetail.users.length; ++i) {
            if (userName === boardDetail.users[i]) {
                uniqueId = i;
                break;
            }
        }

        for (let i = 0; i < boardDetail.viewers.length; ++i) {
            if (userName === boardDetail.viewers[i]) {
                uniqueId = i + 4;
                boardDetail.stateManagement.addViewer(userName);
                break;
            }
        }
        res.json({uniqueId: uniqueId});
    }
]);

/*gameManagement.post('/viewerEnter',[
    auth.userAuthentication,
    authBoard.boardAuthentication,
    (req, res) => {
        const body = JSON.parse(req.body);
        const boardDetail = authBoard.getBoardDetail(body.gameName);
        boardDetail.active = true ;
        if (boardDetail.game === undefined) {
            boardDetail.game = new game(boardDetail.users, boardDetail.computer);
            boardDetail.stateManagement = new stateManagement();
            boardDetail.stateManagement.setStartGame(boardDetail.game, boardDetail.numOfPlayers);
            boardDetail.chatContent = [];
        }
        const userName = auth.getUserInfo(req.session.id).name;
        let uniqueId;
        for (let i = 0; i < boardDetail.users.length; ++i) {
            if (userName === boardDetail.users[i]) {
                uniqueId = i;
                break;
            }
        }
        res.json({uniqueId: uniqueId});
    }
]);*/

gameManagement.post('/pull',[
    auth.userAuthentication,
    (req, res) => {
        const body = JSON.parse(req.body);
        const boardDetail = authBoard.getBoardDetail(body.gameName);
        const manger = boardDetail.stateManagement;
        const uniqueId = body.uniqueID;
        const userName = auth.getUserInfo(req.session.id).name;
        const answer = {playersCards: manger.playersCards,
            openCard: manger.openCard, stackImage: manger.stackImage,
            gameState: manger.gameState,
            player: manger.getUserDetails(uniqueId, userName)};
        res.json({manager: answer});
    }
]);//

/*gameManagement.post('/pullViewerDetails',[
    auth.userAuthentication,
    (req, res) => {
        const body = JSON.parse(req.body);
        const boardDetail = authBoard.getBoardDetail(body.gameName);
        const manger = boardDetail.stateManagement;
        const currentPlayer = manger.playerManagement[manger.game.turn];
        const firstPlayer = manger.playerManagement[manger.game.turn];
        const answer = {playersCards: manger.playersCards,
            openCard: manger.openCard, stackImage: manger.stackImage,
            gameState: manger.gameState,
            player: {statisticsMassages: currentPlayer.statisticsMassages,
                stackCards: firstPlayer.stackCards, openCardAnm: firstPlayer.openCardAnm,
            }};
        res.json({manager: answer});
    }
]);*/

gameManagement.post('/cardError',[
    auth.userAuthentication,
    (req, res) => {
        const body = JSON.parse(req.body);
        const boardDetail = authBoard.getBoardDetail(body.gameName);
        boardDetail.game.renderError(body.error, body.uniqueID);
        res.sendStatus(200);
    }
]);

gameManagement.post('/animationCardEnd',[
    auth.userAuthentication,
    (req, res) => {
        const body = JSON.parse(req.body);
        const boardDetail = authBoard.getBoardDetail(body.gameName);
        if(body.uniqueID < 4)
            boardDetail.game.animationCardEnd(body.uniqueID);
        else{
            const userName = auth.getUserInfo(req.session.id).name;
            const viewerManagements = boardDetail.stateManagement.viewerManagement;
            for(let i = 0; i < viewerManagements.length; ++i){
                if(userName === viewerManagements[i].name){
                    viewerManagements[i].stackCards.length = 0;
                    break;
                }
            }
        }
        res.sendStatus(200);
    }
]);

gameManagement.post('/setDrop',[
    auth.userAuthentication,
    (req, res) => {
        const body = JSON.parse(req.body);
        const boardDetail = authBoard.getBoardDetail(body.gameName);
        boardDetail.game.setDrop(body.id, body.uniqueID);
        res.sendStatus(200);
    }
]);

gameManagement.post('/colorPicked',[
    auth.userAuthentication,
    (req, res) => {
        const body = JSON.parse(req.body);
        const boardDetail = authBoard.getBoardDetail(body.gameName);
        boardDetail.game.colorPicked(body.color, body.uniqueID);
        res.sendStatus(200);
    }
]);

gameManagement.post('/pullCard',[
    auth.userAuthentication,
    (req, res) => {
        const body = JSON.parse(req.body);
        const boardDetail = authBoard.getBoardDetail(body.gameName);
        boardDetail.game.pullCard(body.uniqueID);
        res.sendStatus(200);
    }
]);

gameManagement.post('/finishAnimation',[
    auth.userAuthentication,
    (req, res) => {
        const body = JSON.parse(req.body);
        const boardDetail = authBoard.getBoardDetail(body.gameName);
        if(body.uniqueID < 4) {
            const playerManagements = boardDetail.stateManagement.playerManagement;
            playerManagements[body.uniqueID].openCardAnm = false;
            if (boardDetail.computer)
                playerManagements[playerManagements.length - 1].openCardAnm = false;
        }else{
            const userName = auth.getUserInfo(req.session.id).name;
            const viewerManagements = boardDetail.stateManagement.viewerManagement;
            for(let i = 0; i < viewerManagements.length; ++i){
                if(userName === viewerManagements[i].name){
                    viewerManagements[i].openCardAnm = false;
                    break;
                }
            }
        }
        res.sendStatus(200);
    }
]);

gameManagement.post('/prev',[
    auth.userAuthentication,
    (req, res) => {
        const body = JSON.parse(req.body);
        const boardDetail = authBoard.getBoardDetail(body.gameName);
        const uniqueId = body.uniqueID;
        boardDetail.game.prev(uniqueId);
        const turnIndex = boardDetail.stateManagement.playerManagement[uniqueId].turnIndex;
        const manger = boardDetail.stateManagement.playerManagement[uniqueId].savesStates[turnIndex];
        const answer = {playersCards: manger.playersCards,
            openCard: manger.openCard, stackImage: manger.stackImage,
            gameState: manger.gameState,
            player: manger.playerManagement[uniqueId]};
        res.json({manager: answer});
    }
]);

gameManagement.post('/next',[
    auth.userAuthentication,
    (req, res) => {
        const body = JSON.parse(req.body);
        const boardDetail = authBoard.getBoardDetail(body.gameName);
        const uniqueId = body.uniqueID;
        boardDetail.game.next(uniqueId);
        const turnIndex = boardDetail.stateManagement.playerManagement[uniqueId].turnIndex;
        const manger = boardDetail.stateManagement.playerManagement[uniqueId].savesStates[turnIndex];
        const answer = {playersCards: manger.playersCards,
            openCard: manger.openCard, stackImage: manger.stackImage,
            gameState: manger.gameState,
            player: manger.playerManagement[uniqueId]};
        res.json({manager: answer});
    }
]);

gameManagement.post('/finishGame',[
    auth.userAuthentication,
    (req, res) => {
        const body = JSON.parse(req.body);
        const boardDetail = authBoard.getBoardDetail(body.gameName);
        if(body.uniqueID < 4) {
            boardDetail.users.splice(0, 1);
            boardDetail.registerPlayers--;
            if (boardDetail.users.length === 0) {
                boardDetail.active = false;
                boardDetail.game = undefined;
                boardDetail.stateManagement = undefined;
                boardDetail.color = "green";
                boardDetail.chatContent = undefined;
            }
        }else{
            const userName = auth.getUserInfo(req.session.id).name;
            boardDetail.stateManagement.removeViewer(userName);
            for (let i = 0; i < boardDetail.viewers.length; ++i) {
                if (userName === boardDetail.viewers[i]) {
                    boardDetail.viewers.splice(i, 1);
                    break;
                }
            }
        }
        res.sendStatus(200);
    }
]);



module.exports = gameManagement;

/*            <div>
                    {this.state.manager.playersCards.map(this.eachPlayerInEndGame)}
                    <PickColor interactive = {false} visible = {this.state.manager.player.pickColorVidibility} ref= {this.pickColorHolder}/>
                    <Stack cards = {[]} images = {this.images} interactive = {false} img = {this.state.manager.stackImage} pickColorRef = {this.pickColorHolder} />
                </div>
                <div>
                    <p id ="errors">{this.state.manager.player.error}</p>
                    <button id={"next"} onClick={this.next}>Next</button>
                    <button id={"prev"} onClick={this.prev}>Prev</button>
                </div>
            </div>
*/