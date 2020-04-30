import { CREATE_EVENT_SUCCESS } from "../actions";

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

		default:
			return state;
	}
};
