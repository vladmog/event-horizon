import axios from "axios";
import { useAuth0 } from "../../react-auth0-spa";

const url = process.env.REACT_APP_BACKENDURL
	? process.env.REACT_APP_BACKENDURL
	: "http://localhost:5000";

export const GET_USER_START = "GET_USER_START";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILURE = "GET_USER_FAILURE";

export const getUser = (token, emailAddress) => {
	return async dispatch => {
		dispatch({
			type: GET_USER_START,
		});
		try {
			const response = await axios.post(
				`${url}/api/user/get_user`,
				{ emailAddress: emailAddress },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			dispatch({
				type: GET_USER_SUCCESS,
				payload: response.data,
			});
		} catch (err) {
			dispatch({
				type: GET_USER_FAILURE,
				payload: err,
			});
		}
	};
};

export const CREATE_USER_START = "CREATE_USER_START";
export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS";
export const CREATE_USER_FAILURE = "CREATE_USER_FAILURE";

export const createUser = (token, user) => {
	return async dispatch => {
		dispatch({
			type: CREATE_USER_START,
		});
		try {
			const response = await axios.post(
				`${url}/api/user/create_user`,
				user,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			dispatch({
				type: CREATE_USER_SUCCESS,
				payload: response.data,
			});
		} catch (err) {
			dispatch({
				type: CREATE_USER_FAILURE,
				payload: err,
			});
		}
	};
};

// export const getUser = token => dispatch => {
// 	// Retrieves user email address and user_id upon successful Auth0 login redirect
// 	dispatch({ type: GET_USER_START });
// 	return axios
// 		.get(
// 			// T E S T   A P I
// 			`${url}/api/user/`
// 			// ,{
// 			//     headers: {
// 			//         Authorization: `Bearer ${token}`,
// 			//         "Content-Type": "application/json"
// 			//     }
// 			// }
// 		)
// 		.then(res => {
// 			dispatch({
// 				type: GET_USER_SUCCESS,
// 				payload: res,
// 			});
// 			return true;
// 		})
// 		.catch(err => {
// 			dispatch({
// 				type: GET_USER_FAILURE,
// 				payload: err,
// 			});
// 			return false;
// 		});
// };
