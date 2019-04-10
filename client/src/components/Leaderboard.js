import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { Link } from 'react-router-dom';
import * as actions from '../actions';

class Leaderboard extends Component {

	constructor(props) {
		super(props);

		this.refreshLeaderboards = this.refreshLeaderboards.bind(this);
		this.createLeaderboards = this.createLeaderboards.bind(this);
	}

	componentDidMount() {
		this.refreshLeaderboards();
	}

	refreshLeaderboards() {
		this.props.fetchLeaderboards();
	}


	createLeaderboards() {
		var position = 1;
		return this.props.leaderboards.map(user => {
			return (
				<div key={user._id} className="darken-1">
					<p>{position++}. {user.username} {user.score}</p>
				</div>
			);
		});
	}

	renderContent() {
		switch (this.props.leaderboards) {
			case null:
			case false:
			case undefined:
				return <li>Somehow... the Leaderboards are empty.</li>;
			default:
				return this.createLeaderboards();
		}
	}

	render() {
		return (
			<div className="container">
				<div className = "row">
					<div className="col s12">
						<div className="card darken-1">
							<div className="card-content">
								<span className="card-title">Leaderboard</span>
								<ul>
									{this.renderContent()}
								</ul>
							</div>
							<div className="card-action">
								<button className="waves-effect waves-light btn" onClick={this.refreshLeaderboards}>Refresh</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps({leaderboards}) {
	return { leaderboards };
}

export default connect(mapStateToProps, actions)(Leaderboard);