import {
	CREATE_EVENT_SUCCESS,
	GET_USER_SUCCESS,
	JOIN_EVENT_SUCCESS,
} from "../actions";

const initialState = {
	events: [],
	eventHashIndexes: {},
};

export const eventsReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case CREATE_EVENT_SUCCESS:
			console.log("Create event payload", payload); // should be events
			let events = payload;
			//  Create object that maps event IDs to their index in array for efficient access
			let eventHashIndexes = {};
			for (let i = 0; i < events.length; i++) {
				let eventHash = events[i].eventHash;
				let eventIndex = i;
				eventHashIndexes[eventHash] = eventIndex;
			}
			return {
				...state,
				events: events,
				eventHashIndexes: eventHashIndexes,
			};
		case GET_USER_SUCCESS:
			// IF USER IN DB
			if (payload) {
				let events = payload.events;
				//  Create object that maps event IDs to their index in array for efficient access
				let eventHashIndexes = {};
				for (let i = 0; i < events.length; i++) {
					let eventHash = events[i].eventHash;
					let eventIndex = i;
					eventHashIndexes[eventHash] = eventIndex;
				}
				return {
					...state,
					events: events,
					eventHashIndexes: eventHashIndexes,
				};
			} else {
				// IF USER NOT IN DB
				return {
					...state,
				};
			}
		case JOIN_EVENT_SUCCESS:
			if (payload) {
				let events = payload;
				let eventHashIndexes = {};
				for (let i = 0; i < events.length; i++) {
					let eventHash = events[i].eventHash;
					let eventIndex = i;
					eventHashIndexes[eventHash] = eventIndex;
				}
				return {
					...state,
					events: events,
					eventHashIndexes: eventHashIndexes,
				};
			}

		default:
			return state;
	}
};
