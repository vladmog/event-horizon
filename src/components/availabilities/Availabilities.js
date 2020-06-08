import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { Link } from "react-router-dom";
import Calendar from "../calendar/Calendar";
import Participants from "./Participants";
import { Cal } from "../../utils/Cal";
import {
	setUpdateMode,
	updateAvailability,
	getAvailabilities,
} from "../../redux/actions";

const Availabilities = props => {
	let eventHash = props.match.params.eventHash;
	let eventIndex = props.eventHashIndexes[eventHash];
	let event = props.events[eventIndex];
	let eventParticipants = props.eventParticipants[event.id];
	const [cal, setCal] = useState([[{ date: "blank" }]]); // for methods (methods modify and return a calendar to be passed into dispCal)
	const [dispCal, setDispCal] = useState([[{ date: "blank" }]]); // for display
	const [isCalInit, setIsCalInit] = useState(false);

	const [addedAvailsArr, setAddedAvailsArr] = useState([]); // stores avails to add on submit
	const [addedAvailsObj, setAddedAvailsObj] = useState({}); // stores avails to add for efficient reference

	const [removedAvailsArr, setRemovedAvailsArr] = useState([]); // stores avails to remove on submit
	const [removedAvailsObj, setRemovedAvailsObj] = useState([]); // stores avails to remove for efficient reference

	// Generate calendar array

	const calendar = new Cal();

	useEffect(() => {
		props.getAvailabilities(props.authToken, event.id);
	}, []);

	useEffect(() => {
		// Init calendar if cal is not init and events have been pulled
		// if (!isCalInit && event.id in props.allEventsAvailabilities) {
		if (!isCalInit && props.areAvailsObtained) {
			calendar.initCal();
			let avails = props.allEventsAvailabilities[event.id];
			calendar.addAvails([{ availabilityStart: "Wed Jan 01 2020" }], 1); // test. comment this out for production
			// If event has availabilities, render them to the calendar
			if (avails) {
				// setDispCal on addAvail
				avails.forEach(avail => {
					setDispCal(
						calendar.addAvails(
							[{ availabilityStart: avail.availabilityStart }],
							avail.userId
						)
					);
				});
			}
			setCal(calendar);
			setIsCalInit(true);
		}
	}, [cal, calendar, isCalInit, props.areAvailsObtained]);

	useEffect(() => {
		// Show only user avails when entering update-mode
		if (props.updateMode) {
			setDispCal(cal.isolateUserAvails(props.userId));
		} else {
			// re-add all avails to cal on exiting update-mode
		}
	}, [props.updateMode, cal, props.userId]);

	// Render avails to calendar as they are clicked on in update mode (being replaced by handleSubmit)
	// useEffect(() => {
	// 	if (isCalInit && addedAvails) {
	// 		setDispCal(cal.addAvails(addedAvails, props.userId));
	// 	}
	// }, [addedAvails, cal, isCalInit, props.userId]);

	if (dispCal.length === 1) {
		console.log("cal", cal);
		return <div>init cal in process</div>;
	}

	const handleSubmit = () => {
		let userAvails = props.allEventsAvailabilities;
		console.log("userAvails", userAvails);
		console.log("cal.availabilities", cal.availabilities);

		let add = [];

		cal.availabilities.forEach(calAvail => {
			if (
				props.availabilitiesObj[`${event.id}`] &&
				props.availabilitiesObj[`${event.id}`][`${props.userId}`][
					`${calAvail.date}`
				]
			) {
				// If calendar availability already in avails pulled from BE, pass
				// pass;
			} else {
				// If calendar availability not in backend, add to `add` array
				add.push({
					eventId: event.id,
					userId: props.userId,
					availabilityStart: calAvail.date,
					durationMinutes: 1440,
				});
			}
		});

		let remove = [];
		// and then build out the remove availabilities functionality
		console.log("add", add);
		// props.updateAvailability(props.authToken, event.id, add, remove);
	};

	const handleSelect = (date, action) => {
		console.log("handleSelect cal obj", cal.availabilitiesObj);
		console.log("handleSelect user obj", props.availabilitiesObj);
		console.log("handleSelect addedAvails", addedAvailsObj);
		console.log("handleSelect removedAvails", removedAvailsObj);
		let dateString = date.date; // isolate date string from date object
		console.log("date", date);
		console.log("action", action);

		if (!(dateString in addedAvailsObj) && action === "remove") {
			// REMOVING PRE-EXISTING AVAILABILITY
			console.log("REMOVING PRE-EXISTING AVAILABILITY");
			setRemovedAvailsArr([...removedAvailsArr, date]); // add date object to removedAvails array
			setRemovedAvailsObj({ ...removedAvailsObj, [dateString]: true }); // set date string as key and value true

			// TODO: remove avail from cal / display
		}
		if (dateString in addedAvailsObj && action === "remove") {
			// REMOVING AVAILABILITY THAT WAS JUST ADDED
			console.log("REMOVING AVAILABILITY THAT WAS JUST ADDED");
			let newAddedAvailsArr = addedAvailsArr.filter(avail => {
				return avail.date !== dateString;
			});
			setAddedAvailsArr(newAddedAvailsArr); // remove avail from addedAvailsArray

			let newAddedAvailsObj = { ...addedAvailsObj };
			delete newAddedAvailsObj[`${dateString}`];
			setAddedAvailsObj(newAddedAvailsObj); // remove avail from addedAvailsObj

			// TODO: remove avail from cal / display
		}
		if (!(dateString in removedAvailsObj) && action === "add") {
			// ADDING A NEW AVAILABILITY
			console.log("ADDING A NEW AVAILABILITY");
			setAddedAvailsArr([...addedAvailsArr, date]); // add date object to addedAvails array
			setAddedAvailsObj({ ...addedAvailsObj, [dateString]: true }); // set date string as key and value as true

			// TODO: add avail to cal / display
		}
		if (dateString in removedAvailsObj && action === "add") {
			// RE-ADDING AVAILABILITY THAT WAS JUST REMOVED
			console.log("RE-ADDING AVAILABILITY THAT WAS JUST REMOVED");
			let newRemovedAvailsArr = removedAvailsArr.filter(avail => {
				return avail.date !== dateString;
			});
			setRemovedAvailsArr(newRemovedAvailsArr); // remove avail from removedAvails array

			let newRemovedAvailsObj = { ...removedAvailsObj };
			delete newRemovedAvailsObj[`${dateString}`];
			setRemovedAvailsObj(newRemovedAvailsObj); // remove avail from removedAvails object

			// TODO: add avail to cal / display
		}
	};

	return (
		<div>
			<Link
				to={`/events/${event.eventHash}`}
				onClick={() => props.setUpdateMode(false)}
			>{`< ${event.name}`}</Link>

			<h1>Availabilities</h1>
			<Calendar calendar={dispCal} handleSelect={handleSelect} />
			{props.updateMode ? (
				<div>
					<h3>Select days you're available</h3>
					<button onClick={() => handleSubmit()}>SAVE</button>
				</div>
			) : (
				<Participants eventParticipants={eventParticipants} />
			)}
		</div>
	);
};

const mapStateToProps = ({ user, events, calendar }) => ({
	events: events.events,
	eventHashIndexes: events.eventHashIndexes,
	eventParticipants: events.eventParticipants,
	userId: user.userId,
	updateMode: calendar.updateMode,
	authToken: user.authToken,
	allEventsAvailabilities: events.allEventsAvailabilities,
	availabilitiesObj: events.availabilitiesObj,
	areAvailsObtained: events.areAvailsObtained,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			setUpdateMode,
			updateAvailability,
			getAvailabilities,
		},
		dispatch
	);

export default compose(connect(mapStateToProps, mapDispatchToProps))(
	Availabilities
);

// // TODO

// // If date determined, scroll to event date
// // else scroll to current date
