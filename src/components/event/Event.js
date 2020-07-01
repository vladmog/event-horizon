import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { Link, Redirect } from "react-router-dom";
import DateForm from "./DateForm";
import { setIsEditingDate } from "../../redux/actions";

const Event = (props) => {
	let eventHash = props.match.params.eventHash;
	let eventIndex = props.eventHashIndexes[eventHash];
	let event = props.events[eventIndex];

	if (!event) {
		// If user navigated to page and hasn't joined event, prompt to join or leave.
		return <Redirect to={`/events/join/${eventHash}`} />;
	}
	let eventParticipants = props.eventsParticipants[event.id];

	console.log("event", event);
	console.log("isEditingDate", props.isEditingDate);

	return (
		<div>
			<Link to={"/events"}>BACK</Link>
			<div>{event.name}</div>
			{event.startDate ? (
				<div>
					{!props.isEditingDate && (
						<div>
							<span>Date: {event.startDate}</span>
							<span onClick={() => props.setIsEditingDate(true)}>
								EDIT DATE
							</span>
						</div>
					)}
					{props.isEditingDate && (
						<DateForm startDate={event.startDate} eventId={event.id} />
					)}
				</div>
			) : (
				<div>
					{!props.isEditingDate && (
						<div onClick={() => props.setIsEditingDate(true)}>ADD DATE</div>
					)}
					{props.isEditingDate && (
						<DateForm startDate={event.startDate} eventId={event.id} />
					)}
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
	isEditingDate: events.isEditingDate,
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators({ setIsEditingDate }, dispatch);

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(Event);
