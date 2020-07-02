import axios from "axios";

const url = process.env.REACT_APP_BACKENDURL
	? process.env.REACT_APP_BACKENDURL
	: "http://localhost:5000";

//====================================================

export const SET_ARE_AVAILS_OBTAINED = "SET_ARE_AVAILS_OBTAINED";

export const setAreAvailsObtained = (bool) => {
	return (dispatch) => {
		dispatch({
			type: SET_ARE_AVAILS_OBTAINED,
			payload: bool,
		});
	};
};
//====================================================

export const SET_IS_EDITING_DATE = "SET_IS_EDITING_DATE";

export const setIsEditingDate = (bool) => {
	return (dispatch) => {
		dispatch({
			type: SET_IS_EDITING_DATE,
			payload: bool,
		});
	};
};

//====================================================

export const SET_IS_DELETING_EVENTS = "SET_IS_DELETING_EVENTS";

export const setIsDeletingEvents = (bool) => {
	return (dispatch) => {
		dispatch({
			type: SET_IS_DELETING_EVENTS,
			payload: bool,
		});
	};
};

//====================================================

export const SET_IS_LEAVING_EVENTS = "SET_IS_LEAVING_EVENTS";

export const setIsLeavingEvents = (bool) => {
	return (dispatch) => {
		dispatch({
			type: SET_IS_LEAVING_EVENTS,
			payload: bool,
		});
	};
};

//====================================================

export const CREATE_EVENT_START = "CREATE_EVENT_START";
export const CREATE_EVENT_SUCCESS = "CREATE_EVENT_SUCCESS";
export const CREATE_EVENT_FAILURE = "CREATE_EVENT_FAILURE";

export const createEvent = (token, eventAndUser) => {
	console.log("eventAndUser: ", eventAndUser);
	return async (dispatch) => {
		dispatch({
			type: CREATE_EVENT_START,
		});
		try {
			const response = await axios.post(`${url}/api/events/`, eventAndUser, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
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

//====================================================

export const UPDATE_EVENT_START = "UPDATE_EVENT_START";
export const UPDATE_EVENT_SUCCESS = "UPDATE_EVENT_SUCCESS";
export const UPDATE_EVENT_FAILURE = "UPDATE_EVENT_FAILURE";

export const updateEvent = (token, updates, eventId, userId) => {
	console.log("token", token);
	console.log("updates:", updates);
	console.log("eventId:", eventId);
	return async (dispatch) => {
		dispatch({
			type: UPDATE_EVENT_START,
		});
		try {
			const response = await axios.put(
				`${url}/api/events/${eventId}`,
				{ updates, userId },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			dispatch({
				type: UPDATE_EVENT_SUCCESS,
				payload: response.data,
			});
			return true;
		} catch (err) {
			dispatch({
				type: UPDATE_EVENT_FAILURE,
				payload: err,
			});
			return false;
		}
	};
};

//====================================================
export const DELETE_EVENT_START = "DELETE_EVENT_START";
export const DELETE_EVENT_SUCCESS = "DELETE_EVENT_SUCCESS";
export const DELETE_EVENT_FAILURE = "DELETE_EVENT_FAILURE";

export const deleteEvent = (token, eventId, userId) => {
	console.log("token: ", token);
	console.log("eventId: ", eventId);
	console.log("userId: ", userId);
	return async (dispatch) => {
		dispatch({
			type: DELETE_EVENT_START,
		});
		try {
			const response = await axios.delete(
				`${url}/api/events/${eventId}/${userId}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			dispatch({
				type: DELETE_EVENT_SUCCESS,
				payload: response.data,
			});
			return true;
		} catch (err) {
			dispatch({
				type: DELETE_EVENT_FAILURE,
				payload: err,
			});
			return false;
		}
	};
};

//====================================================

export const JOIN_EVENT_START = "JOIN_EVENT_START";
export const JOIN_EVENT_SUCCESS = "JOIN_EVENT_SUCCESS";
export const JOIN_EVENT_FAILURE = "JOIN_EVENT_FAILURE";

export const joinEvent = (token, userIdAndHash) => {
	console.log("userIdAndHash: ", userIdAndHash);
	return async (dispatch) => {
		dispatch({
			type: JOIN_EVENT_START,
		});
		try {
			const response = await axios.post(
				`${url}/api/events/join`,
				userIdAndHash,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			dispatch({
				type: JOIN_EVENT_SUCCESS,
				payload: response.data,
			});
			return true;
		} catch (err) {
			dispatch({
				type: JOIN_EVENT_FAILURE,
				payload: err,
			});
			return false;
		}
	};
};

export const UPDATE_AVAILABILITY_START = "UPDATE_AVAILABILITY_START";
export const UPDATE_AVAILABILITY_SUCCESS = "UPDATE_AVAILABILITY_SUCCESS";
export const UPDATE_AVAILABILITY_FAILURE = "UPDATE_AVAILABILITY_FAILURE";

export const updateAvailability = (token, eventId, add, remove) => {
	console.log("updateAvailability", token, eventId, add, remove);
	return async (dispatch) => {
		dispatch({
			type: UPDATE_AVAILABILITY_START,
		});
		try {
			const response = await axios.put(
				`${url}/api/events/availabilities/${eventId}`,
				{ add, remove },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			dispatch({
				type: UPDATE_AVAILABILITY_SUCCESS,
				payload: response.data,
			});
			return true;
		} catch (err) {
			dispatch({
				type: UPDATE_AVAILABILITY_FAILURE,
				payload: err,
			});
			return false;
		}
	};
};

export const GET_AVAILABILITIES_START = "GET_AVAILABILITIES_START";
export const GET_AVAILABILITIES_SUCCESS = "GET_AVAILABILITIES_SUCCESS";
export const GET_AVAILABILITIES_FAILURE = "GET_AVAILABILITIES_FAILURE";

export const getAvailabilities = (token, eventId) => {
	return async (dispatch) => {
		dispatch({
			type: GET_AVAILABILITIES_START,
		});
		try {
			const response = await axios.get(
				`${url}/api/events/availabilities/${eventId}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			dispatch({
				type: GET_AVAILABILITIES_SUCCESS,
				payload: response.data,
			});
			return true;
		} catch (err) {
			dispatch({
				type: GET_AVAILABILITIES_FAILURE,
				payload: err,
			});
			return false;
		}
	};
};

export const INVITE_USER_START = "INVITE_USER_START";
export const INVITE_USER_SUCCESS = "INVITE_USER_SUCCESS";
export const INVITE_USER_FAILURE = "INVITE_USER_FAILURE";

export const inviteUser = (token, eventId, userId, adminId) => {
	console.log(`inviteUser eventId ${eventId} userId ${userId}`);
	return async (dispatch) => {
		dispatch({
			type: INVITE_USER_START,
		});
		try {
			const response = await axios.post(
				`${url}/api/events/invite`,
				{ eventId, userId, adminId },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			dispatch({
				type: INVITE_USER_SUCCESS,
				payload: response.data,
			});
			return true;
		} catch (err) {
			dispatch({
				type: INVITE_USER_FAILURE,
				payload: err,
			});
			return false;
		}
	};
};

// TURN THIS INTO A DELETE ENDPOINT
export const UNINVITE_USER_START = "UNINVITE_USER_START";
export const UNINVITE_USER_SUCCESS = "UNINVITE_USER_SUCCESS";
export const UNINVITE_USER_FAILURE = "UNINVITE_USER_FAILURE";

export const uninviteUser = (token, eventId, userId, adminId) => {
	console.log(
		`uninviteUser eventId ${eventId} userId ${userId} adminId ${adminId}`
	);
	return async (dispatch) => {
		dispatch({
			type: UNINVITE_USER_START,
		});
		try {
			const response = await axios.post(
				`${url}/api/events/uninvite`,
				{ eventId, userId, adminId },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			dispatch({
				type: UNINVITE_USER_SUCCESS,
				payload: response.data,
			});
			return true;
		} catch (err) {
			dispatch({
				type: UNINVITE_USER_FAILURE,
				payload: err,
			});
			return false;
		}
	};
};

//====================================================
// same api call as above but different actions

export const LEAVE_EVENT_START = "LEAVE_EVENT_START";
export const LEAVE_EVENT_SUCCESS = "LEAVE_EVENT_SUCCESS";
export const LEAVE_EVENT_FAILURE = "LEAVE_EVENT_FAILURE";

export const leaveEvent = (token, eventId, userId, adminId) => {
	return async (dispatch) => {
		dispatch({
			type: LEAVE_EVENT_START,
		});
		try {
			const response = await axios.post(
				`${url}/api/events/uninvite`,
				{ eventId, userId, adminId },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			dispatch({
				type: LEAVE_EVENT_SUCCESS,
				payload: response.data,
			});
			return true;
		} catch (err) {
			dispatch({
				type: LEAVE_EVENT_FAILURE,
				payload: err,
			});
			return false;
		}
	};
};
