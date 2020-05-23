import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { Link, Redirect } from "react-router-dom";

const Event = props => {
	console.log("Event url hash: ", window.location.hash);
	let eventHash = window.location.hash.substr(1); // grabs eventHash and removes leading "#"
	let eventIndex = props.eventHashIndexes[eventHash];
	let event = props.events[eventIndex];
	if (!event) {
		console.log("forward to invitee flow");
	}

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
					{/* <Link to={`/event/${event.eventHash}/invite`}>Invite</Link> */}
					<Link
						to={{
							pathname: `/event/invite`,
							hash: event.eventHash,
						}}
					>
						Invite
					</Link>
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
