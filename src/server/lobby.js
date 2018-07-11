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
        res.json({boards: boards, users: users});
    });

lobbyManagement.post('/',[
        auth.userAuthentication,
        authBoard.boardAuthentication,
        (req, res) => {
            const body = JSON.parse(req.body);
            const gameName = body.name;
            const numOfPlayers = body.numOfPlayers;
            const computer = body.computer;
            let registers = 0;
            if(computer) {
                registers = 1;
            }
            const userInfo =  auth.getUserInfo(req.session.id);
            const details = {gameName: gameName, numOfPlayers: numOfPlayers,
                userName:userInfo.name, computer: computer, users: [], active: false,
                registerPlayers: registers};
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
            res.json({boardDetail: boardDetail});
        }
    ]);

lobbyManagement.post('/getBoard',[
    auth.userAuthentication,
    (req, res) => {
        const body = req.body;
        const boardDetail = authBoard.getBoardDetail(body);
        res.json({boardDetail: boardDetail});
    }
]);
module.exports = lobbyManagement;