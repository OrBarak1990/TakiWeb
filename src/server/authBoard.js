const boardList = {};


function boardAuthentication(req, res, next) {
    if(boardList[req.body.gameName] !== undefined) {
        res.status(403).send('game name already exist');
    } else {
        next();
    }
}

function addBoardToBoardList(boardDetails) {
    boardList[boardDetails.gameName] = boardDetails;
}

function removeUserFromAuthList(req, res, next) {
    if (userList[req.session.id] === undefined) {
        res.status(403).send('user does not exist');
    } else {
        delete userList[req.session.id];
        next();
    }
}

function getUserInfo(id) {
    return {name: userList[id]};
}

function getAllBoards() {
    return boardList;
}

module.exports = {addBoardToBoardList, boardAuthentication, getAllBoards};
