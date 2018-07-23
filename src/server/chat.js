const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const auth = require('./authUsers');
const authBoard = require('./authBoard');

// const chatContent = [];

const chatManagement = express.Router();

chatManagement.use(bodyParser.text());

chatManagement.route('/')
	.get(auth.userAuthentication, (req, res) => {		
		res.json(chatContent);
	})
	.post(auth.userAuthentication, (req, res) => {
        const body = req.body;

        const userInfo =  auth.getUserInfo(req.session.id);
        chatContent.push({user: userInfo, text: body});
        res.sendStatus(200);
	});

chatManagement.post('/',[
    auth.userAuthentication,
    authBoard.boardAuthentication,
    (req, res) => {
        const body = req.body;
        const boardDetail = authBoard.getBoardDetail(body.gameName);
        const userInfo =  auth.getUserInfo(req.session.id);
        if(boardDetail.users[body.uniqueID] === auth.getUserInfo(req.session.id).name) {
            boardDetail.chatContent.push({user: userInfo, text: body.text});
            res.sendStatus(200);
        }
    }
]);

chatManagement.post('/pull',[
	auth.userAuthentication,
    authBoard.boardAuthentication,
    (req, res) => {
        const body = req.body;
        const boardDetail = authBoard.getBoardDetail(body.gameName);
		if(boardDetail.users[body.uniqueID] === auth.getUserInfo(req.session.id).name)
        	res.json(boardDetail.chatContent);
    }
]);

chatManagement.appendUserLogoutMessage = function(userInfo) {
	chatContent.push({user: userInfo, text: `user had logout`}); 
}


module.exports = chatManagement;