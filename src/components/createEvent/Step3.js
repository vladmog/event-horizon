import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

const Step3 = props => {
	return (
		<div>
			<button
				onClick={e => {
					props.decrementStep(e);
					props.setIsDateKnown(false);
				}}
			>
				BACK
			</button>
			<h2>Length of event</h2>

			<input
				type="radio"
				id="singleDay"
				name="eventLength"
				value="singleDay"
				defaultChecked
				onChange={() => props.setIsMultiDay(false)}
			/>
			<label>Single day</label>

			<input
				type="radio"
				id="multiDay"
				name="eventLength"
				value="multiDay"
				onChange={() => props.setIsMultiDay(true)}
			/>
			<label>Multi day</label>
			{props.isMultiDay ? (
				<div>
					<label>Start-date:</label>
					<input
						type="date"
						name="startDate"
						value={props.startDate}
						onChange={e => props.setStartDate(e.target.value)}
					/>
					<label>End-date:</label>
					<input
						type="date"
						name="endDate"
						value={props.endDate}
						onChange={e => props.setEndDate(e.target.value)}
					/>
				</div>
			) : (
				<div>
					<label>Date:</label>
					<input
						type="date"
						name="startDate"
						value={props.startDate}
						onChange={e => props.setStartDate(e.target.value)}
					/>
				</div>
			)}
			<button onClick={e => props.createEvent(e)}>CREATE EVENT</button>
		</div>
	);
};

const mapStateToProps = ({ user, events }) => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(Step3);
