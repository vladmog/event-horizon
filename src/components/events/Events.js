import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { useAuth0 } from "../../react-auth0-spa";
import { Link } from "react-router-dom";

import { getUser, saveToken } from "../../redux/actions";

const Events = props => {
	const { user } = useAuth0();

	return (
		<div>
			<h1>Events</h1>
			<h2>Hello {user.email}</h2>

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
		},
		dispatch
	);

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(Events);
