const userList = {};
const users = [];

function userAuthentication(req, res, next) {		
	if (userList[req.session.id] === undefined) {
		res.sendStatus(404);
	} else {		
		next();
	}
}

function addUserToAuthList(req, res, next) {	
	if (userList[req.session.id] !== undefined) {
		res.status(403).send('user already exist');
	} else {		
		for (sessionid in userList) {
			const name = userList[sessionid];
			if (name === req.body) {
				res.status(403).send('user name already exist');
				return;
			}
		}		
		userList[req.session.id] = req.body;
		users.push(req.body);
		next();
	}
}

function removeUserFromAuthList(req, res, next) {	
	if (userList[req.session.id] === undefined) {
		res.status(403).send('user does not exist');
	} else {
		const name = userList[req.session.id];
		delete userList[req.session.id];
		users.splice(users.lastIndexOf(name,0), 1);
		next();
	}
}

function getUserInfo(id) {	
    return {name: userList[id]};
}

function getAllUsers() {
	return users;
}

module.exports = {userAuthentication, addUserToAuthList, removeUserFromAuthList, getUserInfo, getAllUsers}
