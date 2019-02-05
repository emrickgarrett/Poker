import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { Link } from 'react-router-dom';

class Login extends Component {

	renderContent() {
		switch (this.props.auth) {
			case null:
			case false:
				return;
			default:
				return <li><a href="/dashboard">Return To Home</a></li>;
		}
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
									<input placeholder="Username" id="username" type="text" className="validate active"/>
								</div>
								<div className="input-field">
									<input placeholder="Password" id="password" type="password" className="validate"/>
								</div>
							</div>
							<div className="card-action">
								<a className="waves-effect waves-light btn" href="#">Login</a>
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

export default connect(mapStateToProps)(Login);