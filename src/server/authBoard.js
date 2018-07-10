const boards = {};
const boardList = [];


function boardAuthentication(req, res, next) {
    if(boards[req.body.gameName] !== undefined) {
        res.status(403).send('game name already exist');
    } else {
        next();
    }
}

function addBoardToBoardList(boardDetails) {
    boards[boardDetails.gameName] = boardDetails;
    boardList.push(boardDetails);
}


function getAllBoards() {
    return boardList;
}

function checkAvailability(req, res, next) {
    const body = JSON.parse(req.body);
    let available = false;
    if(boards[body.gameName].registerPlayers < boards[body.gameName].numOfPlayers) {
        boards[body.gameName].registerPlayers++;
        available = true;
    }
    /*for (let board in boardList) {
        const name = boardList[board].gameName;
        if (name === body.gameName) {
            if(boardList[board].registerPlayers < boardList[board].numOfPlayers) {
                boardList[board].registerPlayers++;
                available = true;
                break;
            }else
                break;
        }
    }
    */
    if(available)
        next();
    else
        res.status(403).send('the game have full players');
}

function getBoardDetail(gameName) {
    /*
    for (let board in boardList) {
        const name = boardList[board].gameName;
        if (name === gameName) {
            return boardList[board];
        }
    }
    return undefined;
    */
    return boards[gameName];
}


module.exports = {addBoardToBoardList, boardAuthentication, getAllBoards, checkAvailability, getBoardDetail};
