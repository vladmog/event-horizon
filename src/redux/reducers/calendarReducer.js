import { TOGGLE_UPDATE_MODE } from "../actions";

const initialState = {
	updateMode: false,
};

export const calendarReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case TOGGLE_UPDATE_MODE:
			return {
				...state,
				updateMode: !state.updateMode,
			};

		default:
			return state;
	}
};
