import axios from "axios";
import { useAuth0 } from "../../react-auth0-spa";

const url = process.env.REACT_APP_BACKENDURL
	? process.env.REACT_APP_BACKENDURL
	: "http://localhost:5000";

//====================================================
export const CREATE_EVENT_START = "CREATE_EVENT_START";
export const CREATE_EVENT_SUCCESS = "CREATE_EVENT_SUCCESS";
export const CREATE_EVENT_FAILURE = "CREATE_EVENT_FAILURE";

export const createEvent = (token, eventAndUser) => {
	console.log("eventAndUser: ", eventAndUser);
	return async dispatch => {
		dispatch({
			type: CREATE_EVENT_START,
		});
		try {
			const response = await axios.post(
				`${url}/api/events/`,
				eventAndUser,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			dispatch({
				type: CREATE_EVENT_SUCCESS,
				payload: response.data,
			});
			return true;
		} catch (err) {
			dispatch({
				type: CREATE_EVENT_FAILURE,
				payload: err,
			});
			return false;
		}
	};
};
