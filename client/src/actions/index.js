import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS, FETCH_LEADERBOARDS } from './types';


export const fetchUser = () => async dispatch => {
	var res;

	await axios.get('/api/current_user').then((data) => {
		res = data;
	}).catch((err) => {
		res = false;
		if(!err.response) {
			//some kind of network error
			console.log("Network Error");
		} else {
			const code = err.response.status;
			if(code <= 500) {
				console.log(err.response.data.message);
			} else {
				console.log("Server Error");
			}
		}
	});
	console.log(res.data);

	dispatch({type: FETCH_USER, payload: res.data });
};

export const loginUser = (username, password, history) => async dispatch => {
	var res;

	await axios
			.post('/api/login', {
				username: username,
				password: password
			})
			.then((data) => {
				console.log(data);
				res = data;
			})
			.catch((err) => {
				res = false;
				console.log(err);
				if(!err.response) {
					//some kind of network error
					console.log("Network Error");
				} else {
					const code = err.response.status;
					if(code <= 500) {
						console.log(err.response.data.message);
					} else {
						console.log("Server Error");
					}
				}
			});
	console.log(res.data);

	if(res) {
		history.push('/games');
	}
	dispatch({type: FETCH_USER, payload: res.data });
}

export const fetchLeaderboards = () => async dispatch => {
	const res = await axios.get('/api/leaderboards');
	console.log(res.data);

	dispatch({ type: FETCH_LEADERBOARDS, payload: res.data });
}

export const handleToken = (token) => async dispatch => {
	const res = await axios.post('/api/stripe', token);

	dispatch({type: FETCH_USER, payload: res.data});
}

export const submitSurvey = (values, history) => async dispatch => {
	const res = await axios.post('/api/surveys', values);

	history.push('/surveys');
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSurveys = () => async dispatch => {
	const res = await axios.get('/api/surveys');

	dispatch({ type: FETCH_SURVEYS, payload: res.data });
};