import { GET_USER_SUCCESS, SAVE_TOKEN } from "../actions";

const initialState = {
	isUserRetrieved: false,
};

export const userReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case GET_USER_SUCCESS:
			let isNewUser;
			if (payload.length > 0) {
				isNewUser = false;
			} else {
				isNewUser = true;
			}
			return {
				...state,
				isUserRetrieved: true,
				isNewUser: isNewUser,
			};

		case SAVE_TOKEN:
			return {
				...state,
				authToken: payload,
			};

		default:
			return state;
	}
};
