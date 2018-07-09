const boardList = [];


function boardAuthentication(req, res, next) {
    for (let board in boardList) {
        const name = boardList[board].gameName;
        if (name === req.body.gameName) {
            res.status(403).send('game name already exist');
            return;
        }
    }
    next();
/*
    if(boardList[req.body.gameName] !== undefined) {
        res.status(403).send('game name already exist');
    } else {
        next();
    }
*/
}

function addBoardToBoardList(boardDetails) {
    // boardList[boardDetails.gameName] = boardDetails;
    boardList.push(boardDetails);
}


function getAllBoards() {
    return boardList;
}

function checkAvailability(req, res, next) {
    const body = JSON.parse(req.body);
    let available = false;
    for (let board in boardList) {
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
    if(available)
        next();
    else
        res.status(403).send('the game have full players');
}

function getBoardDetail(gameName) {
    for (let board in boardList) {
        const name = boardList[board].gameName;
        if (name === gameName) {
            return boardList[board];
        }
    }
    return undefined;
}


module.exports = {addBoardToBoardList, boardAuthentication, getAllBoards, checkAvailability, getBoardDetail};
