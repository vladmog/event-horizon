import axios from "axios";

const url = process.env.REACT_APP_BACKENDURL
    ? process.env.REACT_APP_BACKENDURL
    : "http://localhost:5000/";


export const GET_USER_START = "GET_USER_START";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILURE = "GET_USER_FAILURE";

export const getUser = (token) => (dispatch) => {
    // Retrieves user email address and user_id upon successful Auth0 login redirect
    dispatch({ type: GET_USER_START });
    return axios
        .get(
            // T E S T   A P I 
            `http://dummy.restapiexample.com/api/v1/employees`
            // ,{
            //     headers: {
            //         Authorization: `Bearer ${token}`,
            //         "Content-Type": "application/json"
            //     }
            // }
        )
        .then((res) => {
            dispatch({
                type: GET_USER_SUCCESS,
                payload: res
            });
            return true;
        })
        .catch((err) => {
            dispatch({ 
                type: GET_USER_FAILURE, 
                payload: err 
            });
            return false;
        });
};
