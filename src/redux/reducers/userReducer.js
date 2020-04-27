import { GET_USER_SUCCESS } from "../actions";

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

		default:
			return state;
	}
};
