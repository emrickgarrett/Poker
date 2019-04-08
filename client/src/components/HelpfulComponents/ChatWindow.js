import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { Link } from 'react-router-dom';
import ChatAPI from '../../sockets/api';
import Messages from './Message';
import './message.css';

class ChatWindow extends Component {

	constructor(props) {
		super(props);

		this.state = {
			message: '',
			messages: []
		};

		this.renderMessages = this.renderMessages.bind(this);
		this.sendMessage = this.sendMessage.bind(this);
		this.doneButtonKeyHandler = this.doneButtonKeyHandler.bind(this);
		this.buildMessage = this.buildMessage.bind(this);

		this.chat = new ChatAPI();
	}

	componentDidUpdate() {
		var that = this;
		this.chat.create(this.props.auth.auth_token, function() {
			that.chat.chatMessageReceived(message => {
				console.log(message);
				var messages = that.state.messages;
				messages.push(message);
				that.setState({messages: messages});
				console.log(that.state.messages);
			});
		});
		
	}

	sendMessage(ev) {
		ev.preventDefault();
		var message = this.buildMessage(this.state.message);

		this.chat.sendChatMessage(message, response => {
			console.log("Sent");
		})
		var messages = this.state.messages;
		messages.push(message);
		this.setState({ messages: messages, message: '' });
	}

	buildMessage(message) {
		return { author: this.props.auth.username, message: message }
	}

	doneButtonKeyHandler(ev) {
		if(ev.key === 'Enter') {
			ev.stopPropagation();
			this.sendMessage(ev);
		}
	}

	renderMessages() {
		if(this.props.auth) {
			return (
				<Messages
					messages={this.state.messages}
					currentMember={this.props.auth.username}
				/>
			);
		} else {
			return (<p></p>);
		}
	}

	render() {
		return (
						<div className="card" style={{maxWidth: '400px'}}>
							<div className="card-body">
								<div className="card-title chat-room">Global Chat</div>
								<hr/>
								{this.renderMessages()}
							</div>
							<hr/>
							<div className="footer">
								<input type="text" placeholder="Message"  className="form-control" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})} onKeyDown={this.doneButtonKeyHandler}/>
								<button className="btn btn-primary form-control" onClick={this.sendMessage}>Send</button>
							</div>
						</div>
			);
	}
}

function mapStateToProps({auth}) {
	return { auth };
}

export default connect(mapStateToProps)(ChatWindow);