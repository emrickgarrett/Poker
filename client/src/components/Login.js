import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as actions from '../actions';

class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {username: '', password: ''};

		this.handleUsername = this.handleUsername.bind(this);
		this.handlePassword = this.handlePassword.bind(this);
		this.loginToService = this.loginToService.bind(this);
	}

	renderContent() {
		switch (this.props.auth) {
			case null:
			case false:
				return;
			default:
				return <li><a href="/dashboard">Return To Home</a></li>;
		}
	}

	handleUsername(event) {
		this.setState({username: event.target.value});
	}

	handlePassword(event) {
		this.setState({password: event.target.value});
	}

	loginToService() {
		if(this.state.username === '') {
			console.log("Please Enter a Username");
			return;
		}
		if(this.state.password === '') {
			console.log("Please Enter a Password");
			return;
		}

		this.props.loginUser(this.state.username, this.state.password, this.props.history);
	}

	render() {
		return (
			<div className="container">
				<div className = "row">
					<div className="col s12">
						<div className="card darken-1">
							<div className="card-content">
								<span className="card-title">Please Login</span>
								<div className="input-field">
									<input placeholder="Username" id="username" type="text" value={this.state.username} onChange={this.handleUsername} className="validate active"/>
								</div>
								<div className="input-field">
									<input placeholder="Password" id="password" type="password" value={this.state.password} onChange={this.handlePassword} className="validate"/>
								</div>
							</div>
							<div className="card-action">
								<button className="waves-effect waves-light btn" onClick={this.loginToService}>Login</button>
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

export default connect(mapStateToProps, actions)(Login);