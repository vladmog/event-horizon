import { CREATE_EVENT_SUCCESS, GET_USER_SUCCESS } from "../actions";

const initialState = {
	events: [],
	eventIdIndexes: {},
};

export const eventsReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case CREATE_EVENT_SUCCESS:
			return {
				...state,
				events: [...state.events, payload[0]],
			};
		case GET_USER_SUCCESS:
			// IF USER IN DB
			if (payload) {
				let events = payload.events;
				//  Create object that maps event IDs to their index in array for efficient access
				let eventIdIndexes = {};
				for (let i = 0; i < events.length; i++) {
					let eventId = events[i].id;
					let eventIndex = i;
					eventIdIndexes[eventId] = eventIndex;
				}
				return {
					...state,
					events: events,
					eventIdIndexes: eventIdIndexes,
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
