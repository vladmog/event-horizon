import { CREATE_EVENT_SUCCESS, GET_USER_SUCCESS } from "../actions";

const initialState = {
	events: [],
};

export const eventsReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case CREATE_EVENT_SUCCESS:
			return {
				...state,
				events: [...state.events, payload[0]],
			};
		case GET_USER_SUCCESS:
			if (payload) {
				// IF USER IN DB
				let events = payload.events;
				return {
					...state,
					events: events,
				};
			} else {
				// IF USER NOT IN DB
				return {
					...state,
				};
			}
		default:
			return state;
	}
};
