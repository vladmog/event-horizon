import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { Link, Redirect } from "react-router-dom";
import DateForm from "./DateForm";

const Event = (props) => {
	let eventHash = props.match.params.eventHash;
	let eventIndex = props.eventHashIndexes[eventHash];
	let event = props.events[eventIndex];
	const [isEditingDate, setIsEditingDate] = useState(false);

	if (!event) {
		// If user navigated to page and hasn't joined event, prompt to join or leave.
		return <Redirect to={`/events/join/${eventHash}`} />;
	}
	let eventParticipants = props.eventsParticipants[event.id];

	console.log("event", event);

	return (
		<div>
			<Link to={"/events"}>BACK</Link>
			<div>{event.name}</div>
			{event.startDate ? (
				<div>
					{!isEditingDate && (
						<div>
							<span>Date: {event.startDate}</span>
							<span onClick={() => setIsEditingDate(true)}>EDIT DATE</span>
						</div>
					)}
					{isEditingDate && <DateForm />}
				</div>
			) : (
				<div>
					{!isEditingDate && (
						<div onClick={() => setIsEditingDate(true)}>ADD DATE</div>
					)}
					{isEditingDate && <DateForm />}
				</div>
			)}
			<div>
				Invited:
				{eventParticipants &&
					eventParticipants.map((participant) => {
						return <span key={participant.id}> {participant.userName},</span>;
					})}
			</div>
			<ul>
				<li>
					<Link to={`/events/${event.eventHash}/availabilities`}>
						Availabilities
					</Link>
				</li>
				<li>
					<Link>Cost Split</Link>
					{/* <Link to={``}>Cost Split</Link>  */}{" "}
					{/* uncoment once a view is created for the link to direct to */}
				</li>
				<li>
					<Link>Check-list</Link>
					{/* <Link to={``}>Check-list</Link> */}{" "}
					{/* uncoment once a view is created for the link to direct to */}
				</li>
				{event.isAdmin ? (
					<li>
						<Link to={`/events/${event.eventHash}/invite`}>Invite</Link>
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
	eventsParticipants: events.eventsParticipants,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(Event);
