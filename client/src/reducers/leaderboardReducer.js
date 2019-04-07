import { FETCH_LEADERBOARDS } from '../actions/types'

export default function (state = [], action) {
	switch(action.type) {
		case FETCH_LEADERBOARDS:
			return action.payload;
		default:
			return state;
	}
}