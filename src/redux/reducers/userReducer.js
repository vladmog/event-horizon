import {
	GET_USER_SUCCESS,
	SAVE_TOKEN,
	CREATE_USER_SUCCESS,
	SEARCH_USER_START,
	SEARCH_USER_SUCCESS,
	SEARCH_USER_FAILURE,
} from "../actions";

const initialState = {
	isUserRetrieved: false,
	searchResult: null,
};

export const userReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case GET_USER_SUCCESS:
			if (payload) {
				// IF USER IN DB
				let user = payload.user;
				return {
					...state,
					isUserRetrieved: true,
					isNewUser: false,
					emailAddress: user.emailAddress,
					userName: user.userName,
					userId: user.id,
				};
			} else {
				// IF USER NOT IN DB
				return {
					...state,
					isUserRetrieved: true,
					isNewUser: true,
				};
			}
		case CREATE_USER_SUCCESS:
			let user = payload.user;
			console.log("user in reducer on successful create: ", user);
			return {
				...state,
				isUserRetrieved: true,
				isNewUser: false,
				emailAddress: user.emailAddress,
				userName: user.userName,
				userId: user.id,
			};

		case SEARCH_USER_START:
			return {
				...state,
				searchResult: null,
			};
		case SEARCH_USER_SUCCESS:
			return {
				...state,
				searchResult: payload,
			};
		case SEARCH_USER_FAILURE:
			return {
				...state,
				searchResult: false,
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
