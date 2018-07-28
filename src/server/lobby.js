const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const auth = require('./authUsers');
const authBoard = require('./authBoard');

const lobbyManagement = express.Router();

lobbyManagement.use(bodyParser.text());

// lobbyManagement.route('/')
lobbyManagement.get('/',auth.userAuthentication, (req, res) => {
        const users = auth.getAllUsers();
        const boards = authBoard.getAllBoards();
        let boardMsg = [];
        boards.forEach(b => boardMsg.push({numOfPlayers: b.numOfPlayers,
            registerPlayers: b.registerPlayers, gameName: b.gameName, color: b.color}));
        res.json({boards: boardMsg, users: users});
    });

lobbyManagement.post('/',[
        auth.userAuthentication,
        authBoard.boardAuthentication,
        (req, res) => {
            const body = JSON.parse(req.body);
            const gameName = body.gameName;
            const numOfPlayers = body.numOfPlayers;
            const computer = body.computer;
            let registers = 0;
            if(computer) {
                registers = 1;
            }
            const userInfo =  auth.getUserInfo(req.session.id);
            const details = {gameName: gameName, numOfPlayers: numOfPlayers,
                userName:userInfo.name, computer: computer, viewers: [],
                users: [], active: false, registerPlayers: registers ,
                color: "#2ec728"};
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
            const boardDetail = authBoard.getBoardDetail(body.gameName);
            boardDetail.users.push(auth.getUserInfo(req.session.id).name);
            if(boardDetail.registerPlayers === boardDetail.numOfPlayers){
                boardDetail.color = "#c10000";
            }
            res.json({boardDetail: {registerPlayers: boardDetail.registerPlayers,
                    numOfPlayers: boardDetail.numOfPlayers,  gameName: boardDetail.gameName}});
        }
    ]);

lobbyManagement.post('/viewGame',[
    auth.userAuthentication,
    (req, res) => {
        const body = JSON.parse(req.body);
        const boardDetail = authBoard.getBoardDetail(body.gameName);
        boardDetail.viewers.push(auth.getUserInfo(req.session.id).name);
        res.json({boardDetail: {registerPlayers: boardDetail.registerPlayers,
                numOfPlayers: boardDetail.numOfPlayers,  gameName: boardDetail.gameName}});
    }
]);

lobbyManagement.post('/getBoard',[
    auth.userAuthentication,
    (req, res) => {
        const body = req.body;
        const boardDetail = authBoard.getBoardDetail(body);
        res.json({boardDetail: {registerPlayers: boardDetail.registerPlayers,
                numOfPlayers: boardDetail.numOfPlayers,  gameName: boardDetail.gameName, users: boardDetail.users, computer: boardDetail.computer}});
    }
]);
module.exports = lobbyManagement;