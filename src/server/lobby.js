const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const auth = require('./authUsers');
const authBoard = require('./authBoard');

const lobbyManagement = express.Router();

lobbyManagement.use(bodyParser.text());

lobbyManagement.route('/')
    .get(auth.userAuthentication, (req, res) => {
        const users = auth.getAllUsers();
        const boards = authBoard.getAllBoards();
        res.json({boards: boards, users: users});
    })
    .post([
        auth.userAuthentication,
        authBoard.boardAuthentication,
        (req, res) => {
            const body = req.body;
            const gameName = body.name;
            const numOfPlayers = body.numOfPlayers;
            const userInfo =  auth.getUserInfo(req.session.id);
            const details = {gameName: gameName, numOfPlayers: numOfPlayers,
                userName:userInfo, registerPlayers: 0};
            authBoard.addBoardToBoardList(details);
            res.sendStatus(200);
        }
        ]);


module.exports = lobbyManagement;