const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const auth = require('./authUsers');
const authBoard = require('./authBoard');
// const game = require('./../js/game');
// const stateManagement = require('./../js/stateManagement');

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
            boardDetail.game = new game(boardDetail.users);
            boardDetail.stateManagement = new stateManagement();
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

gameManagement.post('/cardError',[
    auth.userAuthentication,
    (req, res) => {
        const body = JSON.parse(req.body);
        const boardDetail = authBoard.getBoardDetail(body.gameName);
        boardDetail.game.renderError(body.error, body.uniqueID);
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
        boardDetail.game.pullCard(body.color, body.uniqueID);
        res.sendStatus(200);
    }
]);

module.exports = gameManagement;