import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { Link } from 'react-router-dom';
import * as actions from '../../actions';

class CoinFlip extends Component {

	constructor(props) {
		super(props);
		this.state = {coin: "?"}
		console.log("Here");

		this.flipCoin = this.flipCoin.bind(this);
	}

	flipCoin(selected) {
		var coin = this.determineSide() === 0? "H" : "T"
		console.log(coin);
		this.setState({coin: coin})

		//send selected side to server
	}

	determineSide() {
		return Math.floor(Math.random() * 2);
	}

	render() {
		return (
			<div className="container">
				<div className = "row">
					<div className="col s12" style={{textAlign: 'center'}}>
						<div className="coin">{this.state.coin}</div>
						<div className="game-controls">
							<button className="btn" onClick={() => {this.flipCoin(0)}}>Heads</button>
							<button className="btn" onClick={() => this.flipCoin(1)}>Tails</button>
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

export default connect(mapStateToProps, actions)(CoinFlip);