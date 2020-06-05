import { SET_UPDATE_MODE } from "../actions";

const initialState = {
	updateMode: false,
};

export const calendarReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case SET_UPDATE_MODE:
			return {
				...state,
				updateMode: payload,
			};

		default:
			return state;
	}
};
