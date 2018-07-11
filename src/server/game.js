const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const auth = require('./authUsers');
const authBoard = require('./authBoard');
// const game = require('./../js/game');
// const stateManagement = require('./../js/stateManagement');

const lobbyManagement = express.Router();

lobbyManagement.use(bodyParser.text());

lobbyManagement.get('/',auth.userAuthentication, (req, res) => {
    const users = auth.getAllUsers();
    const boards = authBoard.getAllBoards();
    res.json({boards: boards, users: users});
});

lobbyManagement.post('/',[
    auth.userAuthentication,
    authBoard.boardAuthentication,
    (req, res) => {
        const body = JSON.parse(req.body);
        const boardDetail = authBoard.getBoardDetail(body.gameName);
        boardDetail.active = true ;
        if (boardDetail.game === undefined) {
            boardDetail.game = new game();
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

lobbyManagement.post('/card',[
    auth.userAuthentication,
    (req, res) => {
        const body = JSON.parse(req.body);
        const boardDetail = authBoard.getBoardDetail(body.gameName);
        boardDetail.game.renderError(body.error, body.uniqueID);
        res.sendStatus(200);
    }
]);

lobbyManagement.post('/card',[
    auth.userAuthentication,
    (req, res) => {
        const body = JSON.parse(req.body);
        const boardDetail = authBoard.getBoardDetail(body.gameName);
        boardDetail.game.renderError(body.error, body.uniqueID);
        res.sendStatus(200);
    }
]);

// lobbyManagement.route('/boardClicked')
lobbyManagement.post('/boardClicked',[
    auth.userAuthentication,
    authBoard.checkAvailability,
    (req, res) => {
        const body = JSON.parse(req.body);
        let fullPlayers = false;
        if(body.registerPlayers + 1 === body.numOfPlayers)
            fullPlayers = true;
        res.sendStatus(200).json({fullPlayers: fullPlayers});
    }
]);
module.exports = lobbyManagement;