import React, { useEffect } from "react";
import NavBar from "./components/NavBar";
import { useAuth0 } from "./react-auth0-spa";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { getUser, saveToken } from "./redux/actions";

import Profile from "./components/Profile";
import history from "./utils/history";
import PrivateRoute from "./components/PrivateRoute";
import ExternalApi from "./views/ExternalApi";
import Landing from "./components/landing/Landing";
import Events from "./components/events/Events";
import Event from "./components/event/Event";
import CreateEvent from "./components/createEvent/CreateEvent";

function App(props) {
	const { user, loading, isAuthenticated, getTokenSilently } = useAuth0();
	console.log("isUserRetrieved: ", props.isUserRetrieved);
	console.log("isAuthenticated: ", isAuthenticated);

	useEffect(() => {
		if (isAuthenticated) {
			getTokenSilently().then(token => {
				console.log("user: ", user);
				console.log("token: ", token);
				// props.getUser(token, user.email);
				// props.saveToken(token);
			});
		}
	}, [isAuthenticated]);

	// If auth is loading
	if (loading) {
		return <div>Loading...</div>;
	}

	if (isAuthenticated && !props.isUserRetrieved) {
		return <div>Getting user info app.js</div>;
	}

	return (
		<div className="App">
			<Router history={history}>
				<header>{/* <NavBar /> */}</header>
				<Switch>
					<Route path="/" exact component={Landing} />
					<PrivateRoute path="/events" exact component={Events} />
					<PrivateRoute
						path="/events/create"
						component={CreateEvent}
					/>
					<PrivateRoute path="/events/:eventName" component={Event} />
					<PrivateRoute path="/profile" component={Profile} />
					<PrivateRoute
						path="/external-api"
						component={ExternalApi}
					/>
				</Switch>
			</Router>
		</div>
	);
}

const mapStateToProps = ({ user, events }) => ({
	isUserRetrieved: user.isUserRetrieved,
	isNewUser: user.isNewUser,
	events: events.events,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			getUser,
			saveToken,
		},
		dispatch
	);

export default compose(connect(mapStateToProps, mapDispatchToProps))(App);
