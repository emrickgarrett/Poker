
class GameMaster {

	//We only want one GameMaster
	constructor() {
		return this.gameMaster();
	}

	//Static way to get the Gamemaster
	GetGameMaster() {
		if(typeof this.gameMaster === "undefined") {
			this.gameMaster = new GameMaster();
			this.games = [];
		}
		return this.gameMaster();
	}

	FindLobby(lobbyId) {
		var index = games.indexOf(lobbyId);
		if(index >= 0) {
			return games[index];
		} else {
			return false;
		}
	}

	JoinLobby(lobbyId, user) {
		var lobby = this.GetGameMaster().FindLobby(lobbyId);
		if(lobby) {
			if(lobby.joinLobby(user)) {
				console.log("User Joined Successfully");
				return true;
			}
			console.log("Lobby Join Failed");
		}
		return false;
	}

	DisconnectFromLobby(lobbyId, user) {
		var lobby = this.GetGameMaster().FindLobby(lobbyId);
		if(lobby) {
			if(lobby.disconnectFromLobby(user)) {
				console.log("User ded");
				return true;
			}
			console.log("User was never alive");
		}
		return false;
	}

	//Will want ensure security around this function... shouldn't be accessible from client
	EndGame(lobbyId) {
		var lobby = this.GetGameMaster().FindLobby(lobbyId);
		if(lobby) {
			if(lobby.endLobby()) {
				console.log("OOF");
				return true;
			}
			console.log("Lobby was always ded");
		}
		return false;
	}

}

module.exports = GameMaster;