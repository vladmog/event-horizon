export const SET_NAV_STATE = "SET_NAV_STATE";

export const setNavState = (obj) => {
	return (dispatch) => {
		dispatch({
			type: SET_NAV_STATE,
			payload: obj,
		});
	};
};
