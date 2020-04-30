import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { Link } from "react-router-dom";

import { createEvent } from "../../redux/actions";

import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

const CreateEvent = props => {
	const [step, setStep] = useState(1);
	const [eventName, setEventName] = useState("");
	const [isDateKnown, setIsDateKnown] = useState(false);
	const [isMultiDay, setIsMultiDay] = useState(false);
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");

	// Call to advance through user flow
	const incrementStep = e => {
		e.preventDefault();
		setStep(step + 1);
	};
	// Call to go back in user flow
	const decrementStep = e => {
		e.preventDefault();
		setStep(step - 1);
	};
	// POST event to DB
	const createEvent = () => {
		let user = {
			id: props.userId,
			userName: props.userName,
		};

		let event = {
			name: eventName,
			inviteUrl: Math.random().toString(),
		};
		if (isDateKnown) {
			event.startDate = startDate;
		}
		if (isDateKnown && isMultiDay) {
			event.endDate = endDate;
		}

		props.createEvent(props.authToken, { event, user }).then(res => {
			if (res) {
				props.history.push("/events");
			} else {
				console.log("maybe try logging in and out");
			}
		});
	};

	const steps = {
		1: (
			<Step1
				eventName={eventName}
				setEventName={setEventName}
				incrementStep={incrementStep}
			/>
		),
		2: (
			<Step2
				decrementStep={decrementStep}
				incrementStep={incrementStep}
				setIsDateKnown={setIsDateKnown}
				createEvent={createEvent}
			/>
		),
		3: (
			<Step3
				decrementStep={decrementStep}
				setIsDateKnown={setIsDateKnown}
				isMultiDay={isMultiDay}
				setIsMultiDay={setIsMultiDay}
				startDate={startDate}
				setStartDate={setStartDate}
				endDate={endDate}
				setEndDate={setEndDate}
				createEvent={createEvent}
			/>
		),
	};

	// console.log("=================");
	// console.log("eventName: ", eventName);
	// console.log("isDateKnown: ", isDateKnown);
	// console.log("isMultiDay: ", isMultiDay);
	// console.log("startDate: ", startDate);
	// console.log("endDate: ", endDate);
	// console.log("=================");

	return steps[step];
};

const mapStateToProps = ({ user, events }) => ({
	userId: user.userId,
	userName: user.userName,
	authToken: user.authToken,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			createEvent,
		},
		dispatch
	);

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(CreateEvent);
