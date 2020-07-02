import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { useAuth0 } from "../../react-auth0-spa";
import { Link } from "react-router-dom";

import {
	getUser,
	saveToken,
	setAreAvailsObtained,
	setIsDeletingEvents,
	deleteEvent,
	setIsLeavingEvents,
	leaveEvent,
} from "../../redux/actions";

const Events = (props) => {
	const { user } = useAuth0();
	console.log("user", user);

	useEffect(() => {
		props.setAreAvailsObtained(false);
	}, []);

	const handleDelete = (eventId) => {
		// token, eventId, userId
		props.deleteEvent(props.authToken, eventId, props.userId);
	};

	const handleLeave = (eventId) => {
		props.leaveEvent(props.authToken, eventId, props.userId, props.userId);
	};

	return (
		<div>
			<h1>Events</h1>
			<h2>Hello {user.name}</h2>
			<Link to="/events/create">+NEW EVENT</Link>
			<h3>Your events:</h3>
			<button
				onClick={() => props.setIsDeletingEvents(!props.isDeletingEvents)}
			>
				edit
			</button>
			{props.events
				.filter((event) => {
					return event.isAdmin == true;
				})
				.map((event) => {
					return (
						<div key={event.id}>
							<Link to={`/events/${event.eventHash}`}>
								{/* <Link
								to={`/events/${event.eventHash}/availabilities`}
							> */}
								{event.name}
							</Link>
							{props.isDeletingEvents && (
								<button onClick={() => handleDelete(event.id)}>x</button>
							)}
						</div>
					);
				})}
			<h3>Other's events:</h3>
			<button onClick={() => props.setIsLeavingEvents(!props.isLeavingEvents)}>
				edit
			</button>
			{props.events
				.filter((event) => {
					return event.isAdmin == false;
				})
				.map((event) => {
					return (
						<div key={event.id}>
							<Link to={`/events/${event.eventHash}`}>
								{/* <Link
								to={`/events/${event.eventHash}/availabilities`}
							> */}
								{event.name}
							</Link>
							{props.isLeavingEvents && ( // make this conditional off of a different state machine variable indicating leaving others' events
								<button onClick={() => handleLeave(event.id)}>x</button>
							)}
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
	isDeletingEvents: events.isDeletingEvents,
	authToken: user.authToken,
	userId: user.userId,
	isLeavingEvents: events.isLeavingEvents,
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			getUser,
			saveToken,
			setAreAvailsObtained,
			setIsDeletingEvents,
			deleteEvent,
			setIsLeavingEvents,
			leaveEvent,
		},
		dispatch
	);

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(Events);
