import {
	CREATE_EVENT_SUCCESS,
	GET_USER_SUCCESS,
	JOIN_EVENT_SUCCESS,
	GET_AVAILABILITIES_SUCCESS,
	UPDATE_AVAILABILITY_SUCCESS,
	GET_AVAILABILITIES_START,
	SET_ARE_AVAILS_OBTAINED,
} from "../actions";

const initialState = {
	events: [],
	eventHashIndexes: {},
	eventParticipants: {},
	allEventsAvailabilities: {},
	availabilitiesObj: {},
	areAvailsObtained: false,
};

export const eventsReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case SET_ARE_AVAILS_OBTAINED:
			return {
				...state,
				areAvailsObtained: payload,
			};

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

		case UPDATE_AVAILABILITY_SUCCESS:
			if (payload) {
				// #############################################################
				// Add event participants to `eventParticipants` object if not added already (mainly for use when joining an event)
				// #############################################################

				// UTIL FUNCT for following step
				const isParticipantAdded = (participant, eventId) => {
					for (
						let i = 0;
						i < eventParticipants[eventId].length;
						i++
					) {
						if (
							participant.id === eventParticipants[eventId][i].id
						) {
							return true;
						}
					}
					return false;
				};

				let eventParticipants = { ...state.eventParticipants };

				let eventUsers = payload.eventUsers;
				for (let i = 0; i < eventUsers.length; i++) {
					let participant = eventUsers[i];
					let eventId = participant.eventId;
					// Handle placement
					if (!(eventId in eventParticipants)) {
						// If event array not created, create event array
						eventParticipants[eventId] = [participant];
					} else {
						// If event array created, push participant to event array
						// But only if they weren't added prior
						if (!isParticipantAdded(participant, eventId)) {
							console.log("new user adddeddd");
							eventParticipants[eventId].push(participant);
						}
					}
				}
				// #############################################################
				// Create availabilities array to map over to render in calendar
				// #############################################################
				let availabilities = payload.eventAvailabilities;

				// If no event availabilities found, just return eventParticipants
				if (!availabilities.length) {
					return {
						...state,
						areAvailsObtained: true,
						eventParticipants: eventParticipants,
					};
				}
				let eventId = availabilities[0].eventId;
				let allEventsAvailabilities = {
					...state.allEventsAvailabilities,
					[eventId]: availabilities,
				};

				// #############################################################
				// Create availability object for efficient reference
				// #############################################################

				// each availability stored in following format:
				// availabilityObj.eventId.userId.date = true
				let availabilitiesObj = { ...state.availabilitiesObj }; // experimental
				// let availabilitiesObj = {}; //original
				availabilities.forEach(avail => {
					let eventId = avail.eventId;
					let userId = avail.userId;

					if (availabilitiesObj[`${eventId}`]) {
						if (availabilitiesObj[`${eventId}`][`${userId}`]) {
							availabilitiesObj[`${eventId}`][`${userId}`][
								`${avail.availabilityStart}`
							] = true;
						} else {
							availabilitiesObj[`${eventId}`][`${userId}`] = {};
							availabilitiesObj[`${eventId}`][`${userId}`][
								`${avail.availabilityStart}`
							] = true;
						}
					} else {
						availabilitiesObj[`${eventId}`] = {};
						availabilitiesObj[`${eventId}`][`${userId}`] = {};
						availabilitiesObj[`${eventId}`][`${userId}`][
							`${avail.availabilityStart}`
						] = true;
					}
				});

				return {
					...state,
					allEventsAvailabilities: allEventsAvailabilities,
					availabilitiesObj: availabilitiesObj,
					areAvailsObtained: true,
					eventParticipants: eventParticipants,
				};
			}

		case GET_AVAILABILITIES_START:
			return {
				...state,
				areAvailsObtained: false,
			};

		case GET_AVAILABILITIES_SUCCESS:
			if (payload) {
				// #############################################################
				// Add event participants to `eventParticipants` object if not added already (mainly for use when joining an event)
				// #############################################################

				// UTIL FUNCT for following step
				const isParticipantAdded = (participant, eventId) => {
					for (
						let i = 0;
						i < eventParticipants[eventId].length;
						i++
					) {
						if (
							participant.id === eventParticipants[eventId][i].id
						) {
							return true;
						}
					}
					return false;
				};

				let eventParticipants = { ...state.eventParticipants };

				let eventUsers = payload.eventUsers;
				for (let i = 0; i < eventUsers.length; i++) {
					let participant = eventUsers[i];
					let eventId = participant.eventId;
					// Handle placement
					if (!(eventId in eventParticipants)) {
						// If event array not created, create event array
						eventParticipants[eventId] = [participant];
					} else {
						// If event array created, push participant to event array
						// But only if they weren't added prior
						if (!isParticipantAdded(participant, eventId)) {
							console.log("new user adddeddd");
							eventParticipants[eventId].push(participant);
						}
					}
				}
				// #############################################################
				// Create availabilities array to map over to render in calendar
				// #############################################################
				let availabilities = payload.eventAvailabilities;

				// If no event availabilities found, just return eventParticipants
				if (!availabilities.length) {
					return {
						...state,
						areAvailsObtained: true,
						eventParticipants: eventParticipants,
					};
				}
				let eventId = availabilities[0].eventId;
				let allEventsAvailabilities = {
					...state.allEventsAvailabilities,
					[eventId]: availabilities,
				};

				// #############################################################
				// Create availability object for efficient reference
				// #############################################################

				// each availability stored in following format:
				// availabilityObj.eventId.userId.date = true
				let availabilitiesObj = { ...state.availabilitiesObj }; // experimental
				// let availabilitiesObj = {}; //original
				availabilities.forEach(avail => {
					let eventId = avail.eventId;
					let userId = avail.userId;

					if (availabilitiesObj[`${eventId}`]) {
						if (availabilitiesObj[`${eventId}`][`${userId}`]) {
							availabilitiesObj[`${eventId}`][`${userId}`][
								`${avail.availabilityStart}`
							] = true;
						} else {
							availabilitiesObj[`${eventId}`][`${userId}`] = {};
							availabilitiesObj[`${eventId}`][`${userId}`][
								`${avail.availabilityStart}`
							] = true;
						}
					} else {
						availabilitiesObj[`${eventId}`] = {};
						availabilitiesObj[`${eventId}`][`${userId}`] = {};
						availabilitiesObj[`${eventId}`][`${userId}`][
							`${avail.availabilityStart}`
						] = true;
					}
				});

				return {
					...state,
					allEventsAvailabilities: allEventsAvailabilities,
					availabilitiesObj: availabilitiesObj,
					areAvailsObtained: true,
					eventParticipants: eventParticipants,
				};
			}

			break; // added this to quell an error. hopefully it's cool
		default:
			return state;
	}
};
