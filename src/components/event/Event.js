import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { Link, Redirect } from "react-router-dom";
import DateForm from "./DateForm";
import { setIsEditingDate } from "../../redux/actions";
import Nav from "../nav/Nav";
import styled from "styled-components";

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
		<S.Container>
			<Nav navState={"event"} />
			{/* <Link to={"/events"}>BACK</Link> */}
			<div className={"firstHalf"}>
				<h1 className={"eventName"}>{event.name}</h1>
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
				{/* <div>
					Invited:
					{eventParticipants &&
						eventParticipants.map((participant) => {
							return <span key={participant.id}> {participant.userName},</span>;
						})}
				</div> */}
			</div>

			<ul className={"secondHalf"}>
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
		</S.Container>
	);
};

const S = {
	Container: styled.div`
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		// height: 80vh;
		border: solid red 1px;
		margin-top: 10vh;
		box-sizing: border-box;

		@media (min-width: 750px) {
			flex-direction: row;
			justify-content: space-around;
			margin-top: 30vh;
		}

		.eventName {
			text-transform: uppercase;
		}

		.firstHalf {
			border: solid green 1px;
			min-height: 300px;
			width: 400px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: flex-start;

			h1 {
				margin: 0px;
			}
		}
		.secondHalf {
			border: solid blue 1px;
			min-height: 300px;
			width: 400px;
			list-style-type: none;
			padding: 0px;

			display: grid;
			grid-template-columns: 1fr 1fr;
			grid-template-rows: 1fr 1fr;

			li {
				border: solid black 1px;
			}
		}
	`,
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
