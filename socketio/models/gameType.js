
class GameType {
	constructor(type) {
		switch(type) {
			case types.COIN_FLIP:
				this.maxLobbySize = 2;
				this.maxBuyIn = 100000000;
				this.minBuyIn = 1;
			break;
			case types.BLACKJACK:
				this.maxLobbySize = 4;
				this.maxBuyIn = 100000000;
				this.minBuyIn = 1;
			break;
			case types.POKER:
				this.maxLobbySize = 8;
				this.maxBuyIn = 100000000;
				this.minBuyIn = 1;
			break;
		}

		this.type = type;
	}

	getMaxLobbySize() {
		return this.maxLobbySize || -1;
	}

	getMaxBuyIn() {
		return this.maxBuyIn || -1;
	}

	getMinBuyIn() {
		return this.minBuyIn || -1;
	}

	getType() {
		return type;
	}
}

const types = {
	COIN_FLIP = "coin flip",
	BLACKJACK  = "blackjack",
	POKER = "poker"
}

module.exports = { GameType, types };