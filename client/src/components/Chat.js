import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { Link } from 'react-router-dom';
import ChatWindow from './HelpfulComponents/ChatWindow';

class Chat extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<ChatWindow/>
		);
	}
}



export default Chat;