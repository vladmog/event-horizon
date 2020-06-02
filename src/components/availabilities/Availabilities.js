import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { Link } from "react-router-dom";
import Calendar from "../calendar/Calendar";
import Participants from "./Participants";
import { Cal } from "../../utils/Cal";

const Availabilities = props => {
	let eventHash = props.match.params.eventHash;
	let eventIndex = props.eventHashIndexes[eventHash];
	let event = props.events[eventIndex];
	let eventParticipants = props.eventParticipants[event.id];

	// Generate calendar array
	const calendar = new Cal();
	calendar.initCal();

	// Add event availabilities
	calendar.addAvails(
		[
			{ availabilityStart: "Wed Jan 01 2020" },
			{ availabilityStart: "Sat Feb 01 2020" },
		],
		1
	);

	return (
		<div>
			<Link to={`/events/${event.eventHash}`}>{`< ${event.name}`}</Link>

			<h1>Availabilities</h1>
			<Calendar calendar={calendar} />
			<Participants eventParticipants={eventParticipants} />
		</div>
	);
};

const mapStateToProps = ({ user, events }) => ({
	events: events.events,
	eventHashIndexes: events.eventHashIndexes,
	eventParticipants: events.eventParticipants,
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default compose(connect(mapStateToProps, mapDispatchToProps))(
	Availabilities
);

// TODO

// If date determined, scroll to event date
// else scroll to current date
