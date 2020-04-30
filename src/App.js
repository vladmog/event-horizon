import React from "react";
import NavBar from "./components/NavBar";
import { useAuth0 } from "./react-auth0-spa";
import { Router, Route, Switch } from "react-router-dom";

import Profile from "./components/Profile";
import history from "./utils/history";
import PrivateRoute from "./components/PrivateRoute";
import ExternalApi from "./views/ExternalApi";
import Landing from "./components/landing/Landing";
import Events from "./components/events/Events";
import CreateEvent from "./components/createEvent/CreateEvent";

function App() {
	const { loading } = useAuth0();

	if (loading) {
		return <div>Loading...</div>;
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

export default App;
