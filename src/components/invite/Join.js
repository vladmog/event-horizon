import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { Link } from "react-router-dom";

const Join = props => {
	const joinEvent = () => {
		const eventHash = props.match.params.eventHash;
		const userAndHash = {
			userId: props.userId,
			eventHash: eventHash,
		};
		console.log("userAndHash: ", userAndHash);
	};

	return (
		<div>
			<h1>
				You are not currently part of this event. Would you like to
				join?
			</h1>
			<button onClick={() => joinEvent()}>YES</button>
			<button>NO</button>
		</div>
	);
};

const mapStateToProps = ({ user, events }) => ({
	userId: user.userId,
	events: events.events,
	eventHashIndexes: events.eventHashIndexes,
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(Join);
