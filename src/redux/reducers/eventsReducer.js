import {
	CREATE_EVENT_SUCCESS,
	GET_USER_SUCCESS,
	JOIN_EVENT_SUCCESS,
} from "../actions";

const initialState = {
	events: [],
	eventHashIndexes: {},
	eventParticipants: {},
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
				//  Create object that maps event hashes to their index in array for efficient access
				let eventHashIndexes = {};
				for (let i = 0; i < events.length; i++) {
					let eventHash = events[i].eventHash;
					let eventIndex = i;
					eventHashIndexes[eventHash] = eventIndex;
				}
				// Create object of eventId's paired to participant arrays
				let participants = payload.usersMet;
				let eventParticipants = {};
				for (let i = 0; i < participants.length; i++) {
					let participant = participants[i];
					let eventId = participant.eventId;
					// Handle placement
					if (!(eventId in eventParticipants)) {
						// If event array not created, create event array
						eventParticipants[eventId] = [participant];
					} else {
						// If event array created, push participant to event array
						eventParticipants[eventId].push(participant);
					}
				}
				return {
					...state,
					events: events,
					eventHashIndexes: eventHashIndexes,
					eventParticipants: eventParticipants,
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
			break; // added this to quell an error. hopefully it's cool
		default:
			return state;
	}
};
