import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { Link } from 'react-router-dom';
import ChatAPI from '../../sockets/api';

class ChatWindow extends Component {

	constructor(props) {
		super(props);

		this.state = {
			message: '',
			messages: []
		};

		this.renderMessages = this.renderMessages.bind(this);
		this.sendMessage = this.sendMessage.bind(this);

		this.chat = new ChatAPI();
	}

	componentDidUpdate() {
		var that = this;
		this.chat.create(this.props.auth.auth_token, function() {
			that.chat.sendChatMessage("Test", response => {
				console.log("Sent");
			});

			that.chat.chatMessageReceived(message => {
				console.log(message);
				that.setState({messages: [that.state.messages, message]});
				console.log(that.state.messages);
			});
		});
		
	}

	sendMessage() {
		this.setState({ message: '' });
	}

	renderMessages() {
		this.state.messages
			.map(message => {
				return(
					<div>{message.author}: {message.message}</div>
				)
			});
	}

	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-4">
						<div className="card">
							<div className="card-body">
								<div className="card-title">Global Chat</div>
								<hr/>
								<div className="messages">
									{this.renderMessages()}
								</div>
							</div>
							<div className="footer">
								<input type="text" placeholder="Message"  className="form-control" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})}/>
								<br/>
								<button className="btn btn-primary form-control">Send</button>
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

export default connect(mapStateToProps)(ChatWindow);