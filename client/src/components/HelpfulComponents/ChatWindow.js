import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { Link } from 'react-router-dom';
import ChatAPI from '../../sockets/api';
import Messages from './Message';
import './message.css';

var chatStyle = {
	width: '350px',
	position: 'fixed',
	right: '0',
	bottom: '0'
}

class ChatWindow extends Component {

	constructor(props) {
		super(props);

		this.state = {
			message: '',
			messages: [],
			isOpen: false
		};

		this.renderMessages = this.renderMessages.bind(this);
		this.sendMessage = this.sendMessage.bind(this);
		this.doneButtonKeyHandler = this.doneButtonKeyHandler.bind(this);
		this.buildMessage = this.buildMessage.bind(this);
		this.minimizeChat = this.minimizeChat.bind(this);

		this.chat = new ChatAPI();
	}

	componentDidUpdate() {
		var that = this;
		this.chat.create(this.props.auth.auth_token, function() {
			that.chat.chatMessageReceived(message => {
				var messages = that.state.messages;
				messages.push(message);
				that.setState({messages: messages});
			});
		});
	}

	sendMessage(ev) {
		ev.preventDefault();
		if(this.state.message === "") { return; }
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

	minimizeChat(ev) {
		console.log("Minimize the chat window");
		this.setState({ isOpen: !this.state.isOpen });
	}

	renderChat() {
		if(this.state.isOpen) {
			return (
				<div>
					<hr/>
					{this.renderMessages()}
					<hr/>
					<div className="footer">
						<input type="text" placeholder="Message"  className="form-control" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})} onKeyDown={this.doneButtonKeyHandler}/>
						<button className="btn btn-primary form-control" onClick={this.sendMessage}>Send</button>
					</div>
				</div>
			);
		} else {
			return(<span/>);
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
			return (<span/>);
		}
	}

	render() {
		if(this.props.auth) {
			return (
				<div className="card" style={chatStyle}>
					<div className="card-body">
						<div className="chat-info">
							<button className="btn btn-primary minimize-button" onClick={this.minimizeChat}>{this.state.isOpen? '-' : '+'}</button>
							<span className="card-title chat-room">Global Chat</span>
							<div className="spacer" style={{clear: 'both'}}></div>
						</div>
						
					</div>
					{this.renderChat()}
				</div>
			);
		} else {
			return(<span/>);
		}
	}
}

function mapStateToProps({auth}) {
	return { auth };
}

export default connect(mapStateToProps)(ChatWindow);