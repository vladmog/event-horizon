import React, { useEffect, useState } from "react";
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
	const [cal, setCal] = useState([[{ date: "blank" }]]); // for methods
	const [dispCal, setDispCal] = useState([[{ date: "blank" }]]); // for methods
	const [isCalInit, setIsCalInit] = useState(false);
	const [addedAvails, setAddedAvails] = useState([]);

	// Generate calendar array

	const calendar = new Cal();
	useEffect(() => {
		if (!isCalInit) {
			calendar.initCal();
			calendar.addAvails([{ availabilityStart: "Wed Jan 01 2020" }], 1);
			setDispCal(
				calendar.addAvails(
					[{ availabilityStart: "Thu Jan 02 2020" }],
					2
				)
			);
			setCal(calendar);
			setIsCalInit(true);
		}
	}, [cal]);

	useEffect(() => {
		if (props.updateMode) {
			setDispCal(cal.isolateUserAvails(props.userId));
		} else {
			// re-add all avails to cal
		}
	}, [props.updateMode]);

	useEffect(() => {
		if (isCalInit && addedAvails) {
			setDispCal(cal.addAvails(addedAvails, props.userId));
		}
	}, [addedAvails]);

	if (cal.length === 1) {
		return <div>init cal in process</div>;
	}

	return (
		<div>
			<Link to={`/events/${event.eventHash}`}>{`< ${event.name}`}</Link>

			<h1>Availabilities</h1>
			<Calendar
				calendar={dispCal}
				setAddedAvails={setAddedAvails}
				addedAvails={addedAvails}
			/>
			<Participants eventParticipants={eventParticipants} />
		</div>
	);
};

const mapStateToProps = ({ user, events, calendar }) => ({
	events: events.events,
	eventHashIndexes: events.eventHashIndexes,
	eventParticipants: events.eventParticipants,
	userId: user.userId,
	updateMode: calendar.updateMode,
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default compose(connect(mapStateToProps, mapDispatchToProps))(
	Availabilities
);

// // TODO

// // If date determined, scroll to event date
// // else scroll to current date
