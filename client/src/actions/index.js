import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';


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

	dispatch({type: FETCH_USER, payload: res.data });
};

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