export const TOGGLE_UPDATE_MODE = "TOGGLE_UPDATE_MODE";

export const toggleUpdateMode = () => {
	return dispatch => {
		dispatch({
			type: TOGGLE_UPDATE_MODE,
		});
	};
};
