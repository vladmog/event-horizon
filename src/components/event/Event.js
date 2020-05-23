import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { Link } from "react-router-dom";

const Event = props => {
	let eventHash = props.match.params.eventHash;
	let eventIndex = props.eventHashIndexes[eventHash];
	let event = props.events[eventIndex];
	console.log("event in event: ", event);

	return (
		<div>
			<Link to={"/events"}>BACK</Link>
			<div>{event.name}</div>
			<div>Date: {event.startDate || "To be determined"}</div>
			<div>Invited (come back to this)</div>
			<ul>
				<li>
					<Link to={``}>Availabilities</Link>
				</li>
				<li>
					<Link to={``}>Cost Split</Link>
				</li>
				<li>
					<Link to={``}>Check-list</Link>
				</li>
				<li>
					<Link to={`/events/${event.eventHash}/invite`}>Invite</Link>
				</li>
			</ul>
		</div>
	);
};

const mapStateToProps = ({ user, events }) => ({
	events: events.events,
	eventHashIndexes: events.eventHashIndexes,
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(Event);
