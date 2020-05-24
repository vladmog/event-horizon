import React, { useEffect } from "react";
import { withRouter, Redirect } from "react-router-dom";
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

	const exit = () => {
		console.log("exit");
		return <Redirect to="/events" />;
	};

	return (
		<div>
			<h1>
				You are not currently part of this event. Would you like to
				join?
			</h1>
			<button onClick={() => joinEvent()}>YES</button>
			<Link to="/events">NO</Link>
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
