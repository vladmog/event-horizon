import { SET_NAV_STATE } from "../actions";

const initialState = {};

export const displayReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case SET_NAV_STATE:
			console.log("reached reducer");
			return {
				...state,
			};

		default:
			return state;
	}
};
