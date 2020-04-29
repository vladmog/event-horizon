import { GET_USER_SUCCESS, SAVE_TOKEN, CREATE_USER_SUCCESS } from "../actions";

const initialState = {
	isUserRetrieved: false,
};

export const userReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case GET_USER_SUCCESS:
			if (payload) {
				let user = payload;
				return {
					...state,
					isUserRetrieved: true,
					isNewUser: false,
					emailAddress: user.emailAddress,
					userName: user.userName,
					userId: user.id,
				};
			} else {
				return {
					...state,
					isUserRetrieved: true,
					isNewUser: true,
				};
			}
		case CREATE_USER_SUCCESS:
			let user = payload;
			return {
				...state,
				isUserRetrieved: true,
				isNewUser: false,
				emailAddress: user.emailAddress,
				userName: user.userName,
				userId: user.id,
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
