import React, { useEffect } from "react";
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
import Availabilities from "./components/availabilities/Availabilities";
import styled from "styled-components";

function App(props) {
	const { user, loading, getTokenSilently, logout } = useAuth0();
	const getUser = props.getUser;
	const saveToken = props.saveToken;

	useEffect(() => {
		if (user) {
			getTokenSilently().then((token) => {
				getUser(token, user.email);
				saveToken(token);
			});
		}
	}, [user, getTokenSilently, getUser, saveToken]);

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
		<S.Container className="App">
			<button onClick={() => logout()}>LOGOUT</button>
			<Router history={history}>
				<header>{/* <NavBar /> */}</header>
				<Switch>
					<Route path="/" exact component={Landing} />
					{/* <Route path="/" exact component={Calendar} /> */}
					<PrivateRoute path="/events" exact component={Events} />
					<PrivateRoute path="/events/create" component={CreateEvent} />
					<PrivateRoute exact path="/events/:eventHash" component={Event} />
					<PrivateRoute exact path="/events/join/:eventHash" component={Join} />
					<PrivateRoute path="/events/:eventHash/invite" component={Invite} />
					<PrivateRoute
						path="/events/:eventHash/availabilities"
						component={Availabilities}
					/>
					<PrivateRoute path="/profile" component={Profile} />
					<PrivateRoute path="/external-api" component={ExternalApi} />
				</Switch>
			</Router>
		</S.Container>
	);
}

const S = {
	Container: styled.div`
		width: 100vw;
		box-sizing: border-box;
		// border: solid blue 1px;
		margin: 0px;
		display: flex;
		flex-direction: column;
		align-items: center;
	`,
};

const mapStateToProps = ({ user, events }) => ({
	isUserRetrieved: user.isUserRetrieved,
	isNewUser: user.isNewUser,
	events: events.events,
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			getUser,
			saveToken,
		},
		dispatch
	);

export default compose(connect(mapStateToProps, mapDispatchToProps))(App);
