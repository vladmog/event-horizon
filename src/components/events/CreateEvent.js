import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { Link } from "react-router-dom";

import { createEvent } from "../../redux/actions";

const CreateEvent = props => {
	const [step, setStep] = useState(1);
	const [eventName, setEventName] = useState("");

	const handleSubmit = e => {
		e.preventDefault();
		setStep(step + 1);
	};

	const createEvent = () => {
		let event = {
			name: eventName,
			inviteUrl: Math.random().toString(),
			userId: props.userId,
			userName: props.userName,
		};
		props.createEvent(props.authToken, event);
	};

	if (step === 1) {
		return (
			<form onSubmit={e => handleSubmit(e)}>
				<h1>What is the name of this event?</h1>
				<input
					name="eventName"
					value={eventName}
					onChange={e => setEventName(e.target.value)}
				/>
				<button>CONTINUE</button>
			</form>
		);
	}

	if (step === 2) {
		return (
			<div>
				<h1>Is the date(s) for this event decided?</h1>
				<button>YES</button>
				<button onClick={() => createEvent()}>NO</button>
			</div>
		);
	}
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
