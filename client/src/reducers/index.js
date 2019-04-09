import {combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import leaderboardReducer from './leaderboardReducer';

export default combineReducers({
	auth: authReducer,
	form: formReducer,
	leaderboards: leaderboardReducer
});