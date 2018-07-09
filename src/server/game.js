const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const auth = require('./authUsers');
const authBoard = require('./authBoard');

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
        const gameName = body.name;
        const numOfPlayers = body.numOfPlayers;
        const userInfo =  auth.getUserInfo(req.session.id);
        const details = {gameName: gameName, numOfPlayers: numOfPlayers,
            userName:userInfo.name, registerPlayers: 0};
        authBoard.addBoardToBoardList(details);
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