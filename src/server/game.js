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
    authBoard.boardAuthentication,
    (req, res) => {
        const body = JSON.parse(req.body);
        const boardDetail = authBoard.getBoardDetail(body.gameName);
        boardDetail.active = true ;
        if (boardDetail.game === undefined) {
            boardDetail.game = new game(boardDetail.users, boardDetail.computer);
            boardDetail.stateManagement = new stateManagement();
            boardDetail.stateManagement.setStartGame(boardDetail.game, boardDetail.numOfPlayers);
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
]);

gameManagement.post('/pull',[
    auth.userAuthentication,
    (req, res) => {
        const body = JSON.parse(req.body);
        const boardDetail = authBoard.getBoardDetail(body.gameName);
        const manger = boardDetail.stateManagement;
        const uniqueId = body.uniqueID;
        const answer = {playersCards: manger.playersCards,
            openCard: manger.openCard, stackImage: manger.stackImage,
            gameState: manger.gameState,
            player: manger.playerManagement[uniqueId]};
/*        const answer = {playersCards: manger.playersCards,
            openCard: manger.openCard, stackImage: manger.stackImage,
            gameState: manger.gameState, stackCards: manger.playerManagement[uniqueId].stackCards};*/
        res.json({manager: answer});
    }
]);

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
        boardDetail.game.animationCardEnd(body.uniqueID);
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
        boardDetail.stateManagement.playerManagement[body.uniqueID].openCardAnm = false;
        res.sendStatus(200);
    }
]);

module.exports = gameManagement;