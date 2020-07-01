import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { Link, Redirect } from "react-router-dom";
import { updateEvent, setIsEditingDate } from "../../redux/actions";

const DateForm = (props) => {
	// variable to store new startDate
	const [startDate, setStartDate] = useState("");
	const [isNewDateSelected, setIsNewDateSelected] = useState(false);

	useEffect(() => {
		if (props.startDate) {
			setStartDate(props.startDate);
		}
	}, []);

	const handleChange = (newDate) => {
		if (newDate !== props.startDate) {
			setStartDate(newDate);
			setIsNewDateSelected(true);
		} else {
			setStartDate(newDate);
			setIsNewDateSelected(false);
		}
	};

	const handleCancel = () => {
		setStartDate("");
		setIsNewDateSelected(false);
		props.setIsEditingDate(false);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (isNewDateSelected) {
			console.log("submit new date: ", startDate);
			props.updateEvent(
				props.authToken,
				{ startDate },
				props.eventId,
				props.userId
			);
		}
	};

	console.log("startDate", startDate);

	return (
		<form onSubmit={(e) => handleSubmit(e)}>
			<h4>Select a date for the event</h4>
			<input
				type="date"
				name="startDate"
				value={startDate}
				onChange={(e) => handleChange(e.target.value)}
			/>
			<div>
				<button
					type="submit"
					style={isNewDateSelected ? {} : { color: "grey" }}
				>
					CONFIRM
				</button>
				<button onClick={() => handleCancel()}>CANCEL</button>
			</div>
		</form>
	);
};

const mapStateToProps = ({ user }) => ({
	authToken: user.authToken,
	userId: user.userId,
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators({ updateEvent, setIsEditingDate }, dispatch);

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(DateForm);
