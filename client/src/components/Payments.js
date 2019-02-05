import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {

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
			<StripeCheckout 
				name="Emaily"
				description="$5 for 5 email credits"
				amount={500}
				token={token => this.props.handleToken(token)}
				stripeKey={process.env.REACT_APP_STRIPE_KEY}
			>
			<button className="btn">
				Add Credits
			</button>
			</StripeCheckout>
		);
	}
}

export default connect(null, actions)(Payments);