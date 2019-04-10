
class Lobby {

	constructor(host, gameType) {
		this.host = host;
		this.members = [host];
		this.gameType = gameType;
		//dowork
	}

	joinLobby(user) {
		//prob want to verify the user is a real user so people can't spammerino cappuccino
		if(this.members.length <= gameType.getMaxLobbySize() && !this.members.contains(user)) {
			this.members.push(user);
			return true;
		}
		return false;
	}
		
	//need verification before we get to this point
	disconnectFromLobby(user) {
		if(this.members.contains(user)) {
			this.members.remove(user);
			this.members = this.members.filter(function(user) {
				return user !== user
			});
			return true;
		}
		return false;
	}

	endLobby() {
		console.log("oof i ded");
		return true;
	}

	startGame() {
		//TODO
	}

}

module.exports = Lobby;