import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { Link } from 'react-router-dom';
import axios from 'axios';

class Games extends Component {

	constructor(props) {
		super(props);

		this.refreshLeaderboards = this.refreshLeaderboards.bind(this);
	}

	refreshLeaderboards() {

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

	render() {
		return (
			<div className="container">
				<div className = "row">
					<div className="col s12">
						<div className="card darken-1">
							<div className="card-content">
								<span className="card-title">Games</span>
								<ul>
									<li><Link to="/coinflip">Coin Flip</Link></li>
								</ul>
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

export default connect(mapStateToProps)(Games);