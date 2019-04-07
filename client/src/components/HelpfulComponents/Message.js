import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { Link } from 'react-router-dom';

class Messages extends Component {

	constructor(props) {
		super(props);

	}

	componentDidMount() {

	}

	renderMessage(text) {
		const {author, message} = text;
		console.log(author);
		const {currentMember} = this.props;
		const messageFromMe = author === currentMember;
		const className = messageFromMe ? "messages-message current-member" : "messages-message";
		return (
			<li className={className} key={message}>
				<span
					className="avatar"
					style={{backgroundColor: '#000' }}
				/>
				<div className="message-content">
					<div className="username">
						{author}
					</div>
					<div className="text">{message}</div>
				</div>
			</li>

		)
	}

	render() {
		const { messages } = this.props;
		return (
			<ul className="messages-list">
				{messages.map(m => this.renderMessage(m)) }
			</ul>
		);
	}
}

export default Messages;