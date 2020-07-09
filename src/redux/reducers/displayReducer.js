import { SET_NAV_STATE } from "../actions";

const initialState = {
	navState: "",
	navFuncts: [],
	backPath: "",
};

export const displayReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case SET_NAV_STATE:
			console.log("reached reducer: ", payload);
			return {
				...state,
				...payload,
			};

		default:
			return state;
	}
};
