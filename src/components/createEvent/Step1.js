import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

const Step1 = props => {
	return (
		<form onSubmit={e => props.incrementStep(e)}>
			<h1>What is the name of this event?</h1>
			<input
				name="eventName"
				value={props.eventName}
				onChange={e => props.setEventName(e.target.value)}
			/>
			<button>CONTINUE</button>
		</form>
	);
};

const mapStateToProps = ({ user, events }) => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(Step1);
