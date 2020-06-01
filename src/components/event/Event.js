import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { Link, Redirect } from "react-router-dom";

const Event = props => {
	let eventHash = props.match.params.eventHash;
	let eventIndex = props.eventHashIndexes[eventHash];
	let event = props.events[eventIndex];
	let eventParticipants = props.eventParticipants[event.id];

	if (!event) {
		// If user navigated to page and hasn't joined event, prompt to join or leave.
		return <Redirect to={`/events/join/${eventHash}`} />;
	}

	console.log("event", event);

	return (
		<div>
			<Link to={"/events"}>BACK</Link>
			<div>{event.name}</div>
			<div>Date: {event.startDate || "To be determined"}</div>
			<div>
				Invited:
				{eventParticipants.map(participant => {
					return (
						<span key={participant.id}>
							{" "}
							{participant.userName},
						</span>
					);
				})}
			</div>
			<ul>
				<li>
					<Link to={`/events/${event.eventHash}/availabilities`}>
						Availabilities
					</Link>
				</li>
				<li>
					<Link to={``}>Cost Split</Link>
				</li>
				<li>
					<Link to={``}>Check-list</Link>
				</li>
				{event.isAdmin ? (
					<li>
						<Link to={`/events/${event.eventHash}/invite`}>
							Invite
						</Link>
					</li>
				) : (
					<></>
				)}
			</ul>
		</div>
	);
};

const mapStateToProps = ({ user, events }) => ({
	events: events.events,
	eventHashIndexes: events.eventHashIndexes,
	eventParticipants: events.eventParticipants,
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(Event);
