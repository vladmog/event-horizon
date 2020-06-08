export const SET_UPDATE_MODE = "SET_UPDATE_MODE";

export const setUpdateMode = bool => {
	return dispatch => {
		dispatch({
			type: SET_UPDATE_MODE,
			payload: bool,
		});
	};
};
