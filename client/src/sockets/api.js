const io = require("socket.io-client");

class ChatAPI {

	chatMessageReceived(cb) {
		if(typeof this.chatSocket === "undefined") { 
			console.log("Socket is not authorized");
			return 
		};
		this.chatSocket.on("chat", message => {
			cb(message);
		});
	}

	sendChatMessage(message, cb) {
		if(typeof this.chatSocket === "undefined") {
			console.log("Socket is not authorized");
			return;
		}
		this.chatSocket.emit('message', message);
	}

	create(auth_token, cb) {
		if(typeof this.chatSocket === "undefined") {
			this.chatSocket = 
				io('http://localhost:5000/chat', {
					query: {
						auth_token: auth_token
					}
				});
			cb();
		}
	}
}

export default ChatAPI;