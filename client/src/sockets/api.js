const io = require("socket.io-client");

class ChatAPI {

	constructor(auth_token) {
		this.chatSocket = 
			io('http://localhost:5000/chat', {
				query: {
					auth_token: auth_token
				}
			});
	}

	chatMessageReceived(cb) {
		this.chatSocket.on("chat", message => {
			cb(message);
		});
	}

	sendChatMessage(message, cb) {
		this.chatSocket.emit('message', message);
	}
}

export default ChatAPI;