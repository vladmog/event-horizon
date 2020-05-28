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
import Invite from "./components/invite/Invite";
import Join from "./components/invite/Join";
import FirstLogin from "./components/events/FirstLogin";
import Calendar from "./components/calendar/Calendar";

function App(props) {
	const { user, loading, getTokenSilently, logout } = useAuth0();

	useEffect(() => {
		if (user) {
			getTokenSilently().then(token => {
				props.getUser(token, user.email);
				props.saveToken(token);
			});
		}
	}, [user]);

	// If auth is loading
	if (loading) {
		return <div>Loading...</div>;
	}

	// If logged in via auth but user data not pulled from BE
	if (user && !props.isUserRetrieved) {
		return <div>Getting user info</div>;
	}

	// If logged in via auth but user hasn't created an account
	if (user && props.isNewUser) {
		return (
			<div>
				<button onClick={() => logout()}>LOGOUT</button>
				<FirstLogin />
			</div>
		);
	}

	return (
		<div className="App">
			<button onClick={() => logout()}>LOGOUT</button>
			<Router history={history}>
				<header>{/* <NavBar /> */}</header>
				<Switch>
					{/* <Route path="/" exact component={Landing} /> */}
					<Route path="/" exact component={Calendar} />
					<PrivateRoute path="/events" exact component={Events} />
					<PrivateRoute
						path="/events/create"
						component={CreateEvent}
					/>
					<PrivateRoute
						exact
						path="/events/:eventHash"
						component={Event}
					/>
					<PrivateRoute
						exact
						path="/events/join/:eventHash"
						component={Join}
					/>
					<PrivateRoute
						path="/events/:eventHash/invite"
						component={Invite}
					/>
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
