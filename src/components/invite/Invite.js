import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { Link } from "react-router-dom";

const Invite = props => {
	let eventId = props.match.params.id;
	let eventIndex = props.eventIdIndexes[eventId];
	let event = props.events[eventIndex];
	return (
		<div>
			<Link to={`/events/${event.id}`}>{`< ${event.name}`}</Link>
			<h1>INVITE:</h1>
			<input placeholder="search users..." />
			<div /> {/* temporary line break */}
			<button>Get shareable link</button>
			<h2>Invited:</h2>
			<ul></ul>
		</div>
	);
};

const mapStateToProps = ({ user, events }) => ({
	events: events.events,
	eventIdIndexes: events.eventIdIndexes,
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(Invite);
