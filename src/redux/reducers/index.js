import { createStore, compose, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

import { userReducer } from "./userReducer";
import { eventsReducer } from "./eventsReducer";
import { calendarReducer } from "./calendarReducer";
import { displayReducer } from "./displayReducer";

const rootReducer = combineReducers({
	user: userReducer,
	events: eventsReducer,
	calendar: calendarReducer,
	display: displayReducer,
});

let store;
let middleware;

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
	middleware = [thunk, logger];
	const composeEnhancers =
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	const enhancer = composeEnhancers(applyMiddleware(...middleware));
	store = createStore(
		rootReducer,
		{
			/*preloaded state */
		},
		enhancer
	);
} else {
	store = createStore(
		rootReducer,
		{
			/*preloaded state */
		},
		applyMiddleware(thunk, logger)
	);
}

export { store };
