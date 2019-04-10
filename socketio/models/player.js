
class Player {
	constructor(userId, username, socket, isInGame, gamePlaying) {
		this.userId = userId;
		this.username = username;
		this.socket = socket;
		this.isInGame = isInGame;
		this.gamePlaying = gamePlaying;
	}

	getUserId() {
		return this.userId;
	}

	getUsername() {
		return this.userName;
	}

	getSocket() {
		return this.socket;
	}

	getIsInGame() {
		return this.isInGame;
	}

	getGamePlaying() {
		return this.gamePlaying;
	}

	setIsInGame(isInGame) {
		this.isInGame = isInGame;
		this.gamePlaying = "Lobby";
	}

	setGamePlaying(game) {
		this.gamePlaying = game;
	}
}

module.exports = Player;