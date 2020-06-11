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

	const [dispUserIds, setDispUserIds] = useState([]); // stores userIds of users to display on cal. if empty, show all users. one step ahead of calender render
	const [dispUserIdsObj, setDispUserIdsObj] = useState({}); // stores dispUserIds as obj for efficient reference
	const [lastDispUserRemoved, setLastDispUserRemoved] = useState(null);

	// Generate calendar array

	const calendar = new Cal();

	// GET AVAILABILITIES
	useEffect(() => {
		props.getAvailabilities(props.authToken, event.id);
	}, []);

	// INIT CALENDAR
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
					// console.log("forEach avail", avail);
					setDispCal(
						calendar.addAvails(
							[{ availabilityStart: avail.availabilityStart }], // this is being handled in the else of the following useEffect, can delete
							avail.userId
						)
					);
				});
			}
			setDispCal(calendar);
			setCal(calendar);
			setIsCalInit(true);
		}
	}, [cal, calendar, isCalInit, props.areAvailsObtained]);

	// MAINTAINS CALENDAR DISPLAY STATE BASED ON DISPLAYUSERIDS
	const [dispUserEffectCounter, setDispUserEffectCounter] = useState(0);
	useEffect(() => {
		console.log("dispUserIds useEffect", dispUserIds);
		let userId;
		let date;

		if (isCalInit) {
			console.log("passed gatekeeper if statement");
			// (aggregate view -> single user) || (multiple users -> single user)
			// if only one display user
			if (dispUserIds.length === 1) {
				console.log("only displaying one user");
				// for every user currently displayed
				for (userId in dispCal.availabilitiesObj) {
					// if the user isn't the display user
					if (parseInt(userId) !== dispUserIds[0]) {
						// take all their availabilities
						for (date in dispCal.availabilitiesObj[`${userId}`]) {
							// and remove them
							setDispCal(
								cal.removeAvails(
									[{ availabilityStart: date }],
									userId
								)
							);
						}
					}
				}
			}
			console.log(
				"DEBUG dispUserIds[dispUserIds.length - 1]",
				dispUserIds[dispUserIds.length - 1]
			);
			console.log(
				"DEBUG dispCal.availabilitiesObj",
				dispCal.availabilitiesObj
			);

			console.log(
				"Object.keys(dispCal.availabilitiesObj[`${dispUserIds[dispUserIds.length - 1]}`]).length",
				Object.keys(
					dispCal.availabilitiesObj[
						`${dispUserIds[dispUserIds.length - 1]}`
					]
				).length === 0
			);
			// adding a user when a user is already being displayed
			if (
				Object.keys(
					dispCal.availabilitiesObj[
						`${dispUserIds[dispUserIds.length - 1]}`
					]
				).length === 0
				// if (
				// 	!(
				// 		dispUserIds[dispUserIds.length - 1] in
				// 		dispCal.availabilitiesObj
				// 	)
			) {
				console.log(
					"adding a user when a user is already being displayed"
				);
				let newUserId = dispUserIds[dispUserIds.length - 1];
				for (date in props.availabilitiesObj[`${event.id}`][
					`${newUserId}`
				]) {
					setDispCal(
						cal.addAvails([{ availabilityStart: date }], newUserId)
					);
				}
			}

			// removing a user leaving more than one user
			if (
				Object.keys(dispCal.availabilitiesObj).length > dispUserIds &&
				dispUserIds.length > 1
			) {
				console.log("removing a user leaving more than on user");
				for (userId in dispCal.availabilitiesObj) {
					if (!(userId in dispUserIdsObj)) {
						for (date in props.availabilitiesObj[`${event.id}`][
							`${userId}`
						]) {
							setDispCal(
								cal.removeAvails(
									[{ availabilityStart: date }],
									userId
								)
							);
						}
					}
				}
			}

			// return to aggregate view

			if (!dispUserIds.length) {
				console.log("return to aggregate view");
				let avails = props.allEventsAvailabilities[event.id];
				// If event has availabilities, render them to the calendar
				if (avails) {
					// setDispCal on addAvail
					avails.forEach(avail => {
						console.log("dispCal avails: ", dispCal.availabilities);
						if (avail.userId !== lastDispUserRemoved) {
							setDispCal(
								cal.addAvails(
									[
										{
											availabilityStart:
												avail.availabilityStart,
										},
									], // this is being handled in the else of the following useEffect, can delete
									avail.userId
								)
							);
						}
					});
				}
			}
		}
		setDispUserEffectCounter(dispUserEffectCounter + 1);
	}, [dispUserIds]);

	// HANDLES UPDATE MODE
	const [counter, setCounter] = useState(0); // counter to prevent updateMode === false block from running on render
	useEffect(() => {
		// Show only user avails when entering update-mode
		if (props.updateMode) {
			setDispCal(cal.isolateUserAvails(props.userId));
		}
		if (!props.updateMode && counter > 1) {
			// re-add all avails to cal on exiting update-mod
			let avails = props.allEventsAvailabilities[event.id];
			if (avails) {
				avails.forEach(avail => {
					if (avail.userId !== props.userId) {
						// re-add other participant avails to cal
						setDispCal(
							cal.addAvails(
								[
									{
										availabilityStart:
											avail.availabilityStart,
									},
								],
								avail.userId
							)
						);
					}
				});
			}
		}
		setCounter(counter + 1);
	}, [props.updateMode, cal, props.userId]);

	// LOADER
	if (dispCal.length === 1) {
		return <div>init cal in process</div>;
	}

	const handleSubmit = () => {
		let add = addedAvailsArr.map(avail => {
			return {
				eventId: event.id,
				userId: props.userId,
				availabilityStart: avail.date,
				durationMinutes: 1440,
			};
		});

		let remove = removedAvailsArr.map(avail => {
			return {
				eventId: event.id,
				userId: props.userId,
				availabilityStart: avail.date,
				durationMinutes: 1440,
			};
		});

		console.log("add", add);
		console.log("remove", remove);

		props
			.updateAvailability(props.authToken, event.id, add, remove)
			.then(res => {
				if (res) {
					setAddedAvailsArr([]);
					setAddedAvailsObj({});
					setRemovedAvailsArr([]);
					setRemovedAvailsObj({});
					props.setUpdateMode(false);
				}
			});
	};

	const handleSelect = (date, action) => {
		let dateString = date.date; // isolate date string from date object

		if (!(dateString in addedAvailsObj) && action === "remove") {
			// REMOVING PRE-EXISTING AVAILABILITY
			console.log("REMOVING PRE-EXISTING AVAILABILITY");
			setRemovedAvailsArr([...removedAvailsArr, date]); // add date object to removedAvails array
			setRemovedAvailsObj({ ...removedAvailsObj, [dateString]: true }); // set date string as key and value true

			// remove avail from cal / display
			setDispCal(
				cal.removeAvails(
					[{ availabilityStart: dateString }],
					props.userId
				)
			);
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

			// remove avail from cal / display
			setDispCal(
				cal.removeAvails(
					[{ availabilityStart: dateString }],
					props.userId
				)
			);
		}
		if (!(dateString in removedAvailsObj) && action === "add") {
			// ADDING A NEW AVAILABILITY
			console.log("ADDING A NEW AVAILABILITY");
			setAddedAvailsArr([...addedAvailsArr, date]); // add date object to addedAvails array
			setAddedAvailsObj({ ...addedAvailsObj, [dateString]: true }); // set date string as key and value as true

			// add avail to cal / display
			setDispCal(
				cal.addAvails([{ availabilityStart: dateString }], props.userId)
			);
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

			// add avail to cal / display
			setDispCal(
				cal.addAvails([{ availabilityStart: dateString }], props.userId)
			);
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
				<Participants
					eventParticipants={eventParticipants}
					dispUserIds={dispUserIds}
					setDispUserIds={setDispUserIds}
					dispUserIdsObj={dispUserIdsObj}
					setDispUserIdsObj={setDispUserIdsObj}
					setLastDispUserRemoved={setLastDispUserRemoved}
				/>
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
			setUpdateMode,
		},
		dispatch
	);

export default compose(connect(mapStateToProps, mapDispatchToProps))(
	Availabilities
);

// // TODO

// // If date determined, scroll to event date
// // else scroll to current date
