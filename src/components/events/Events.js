import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { useAuth0 } from "../../react-auth0-spa";
import { Link } from "react-router-dom";

import { getUser, saveToken, setAreAvailsObtained } from "../../redux/actions";

const Events = props => {
	const { user } = useAuth0();
	console.log("user", user);

	useEffect(() => {
		props.setAreAvailsObtained(false);
	}, []);

	return (
		<div>
			<h1>Events</h1>
			<h2>Hello {user.name}</h2>

			<Link to="/events/create">+NEW EVENT</Link>

			<h3>Your events:</h3>
			{props.events
				.filter(event => {
					return event.isAdmin == true;
				})
				.map(event => {
					return (
						<div key={event.id}>
							<Link to={`/events/${event.eventHash}`}>
								{/* <Link
								to={`/events/${event.eventHash}/availabilities`}
							> */}
								{event.name}
							</Link>
						</div>
					);
				})}

			<h3>Other's events:</h3>
			{props.events
				.filter(event => {
					return event.isAdmin == false;
				})
				.map(event => {
					return (
						<div key={event.id}>
							<Link to={`/events/${event.eventHash}`}>
								{/* <Link
								to={`/events/${event.eventHash}/availabilities`}
							> */}
								{event.name}
							</Link>
						</div>
					);
				})}
		</div>
	);
};

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
			setAreAvailsObtained,
		},
		dispatch
	);

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(Events);
