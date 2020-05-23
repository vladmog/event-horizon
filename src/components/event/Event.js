import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { Link } from "react-router-dom";

const Event = props => {
	let eventId = props.match.params.id;
	let eventIndex = props.eventIdIndexes[eventId];
	let event = props.events[eventIndex];

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
					<Link to={`/events/${event.id}/invite`}>Invite</Link>
				</li>
			</ul>
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
)(Event);
