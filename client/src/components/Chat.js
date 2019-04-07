import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { Link } from 'react-router-dom';
import ChatAPI from '../sockets/api';

class Chat extends Component {

	constructor(props) {
		super(props);
	}

	componentDidUpdate() {
		console.log(`Auth: ${JSON.stringify(this.props.auth.auth_token)}`);
		var chat = new ChatAPI(this.props.auth.auth_token);

		chat.chatMessageReceived(message => {
			console.log(message);
		});

		chat.sendChatMessage("swiggity Swooty", response => {
			console.log("Sent");
		});
	}

	render() {
		return (
			<div className="container">
				<div className = "row">
					<div className="col s12">
						<div className="card darken-1">
							<div className="card-content">
								<span className="card-title">Chat</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps({auth}) {
	return { auth };
}

export default connect(mapStateToProps)(Chat);