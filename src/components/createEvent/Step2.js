import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

const Step2 = props => {
	return (
		<div>
			<button onClick={e => props.decrementStep(e)}>BACK</button>
			<h1>Is the date(s) for this event decided?</h1>
			<button
				onClick={e => {
					props.incrementStep(e);
					props.setIsDateKnown(true);
				}}
			>
				YES
			</button>
			<button onClick={() => props.createEvent()}>NO</button>
		</div>
	);
};

const mapStateToProps = ({ user, events }) => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(Step2);
