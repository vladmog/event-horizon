import {
    GET_USER_SUCCESS,
} from "../actions";
  
  const initialState = {
      isUserRetrieved: false
  };
  
  export const userReducer = (state = initialState, {type, payload}) => {
    switch (type) {

        case GET_USER_SUCCESS:
        return {
            ...state,
            isUserRetrieved: true,
        };
        
        default:
            return state;
    }
  };