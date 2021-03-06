import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Login from './Login';
import Games from './Games';
import CoinFlip from './Games/CoinFlip';
import GameLobby from './Games/GameLobby';
import Leaderboard from './Leaderboard';
import Chat from './Chat';
import ChatWindow from './HelpfulComponents/ChatWindow';

class App extends Component {

	componentDidMount() {
		this.props.fetchUser();
	}

	render() {
		return (
			<div>
			<BrowserRouter>
				<div>
					<Header/>
					<div className="container">
						<Route exact path="/" component = {Landing} />
						<Route exact path="/games" component={Games} />
						<Route exact path="/coinflip" component={CoinFlip} />
						<Route exact path="/lobby" component={GameLobby} />
						<Route exact path="/chat" component={Chat} />
						<Route exact path="/leaderboard" component={Leaderboard} />
						<Route path="/auth/login" component={Login} />
					</div>
					<ChatWindow/>
				</div>
			</BrowserRouter>
			</div>
		);
	}
};

export default connect(null, actions)(App);