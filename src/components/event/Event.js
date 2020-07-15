import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { Link, Redirect } from "react-router-dom";
import DateForm from "./DateForm";
import { setIsEditingDate } from "../../redux/actions";
import Nav from "../nav/Nav";
import styled from "styled-components";
import availabilities from "../../media/availabilities.svg";
import dollar from "../../media/dollar.svg";
import checklist from "../../media/checklist.svg";
import invite from "../../media/invite.svg";

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
							<div
								className={"addDateButton"}
								onClick={() => props.setIsEditingDate(true)}
							>
								ADD DATE
							</div>
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
					<S.Link to={`/events/${event.eventHash}/availabilities`}>
						<div className={"imgContainer"}>
							<img src={availabilities} />
						</div>
						<div>Availabilities</div>
					</S.Link>
				</li>
				<li>
					<S.Link>
						<div className={"imgContainer"}>
							<img src={dollar} />
						</div>
						<div>Cost Split</div>
					</S.Link>
					{/* <S.Link to={``}>Cost Split</S.Link>  */}{" "}
					{/* uncoment once a view is created for the link to direct to */}
				</li>
				<li>
					<S.Link>
						<div className={"imgContainer"}>
							<img src={checklist} />
						</div>
						<div>Check-list</div>
					</S.Link>
					{/* <S.Link to={``}>Check-list</S.Link> */}{" "}
					{/* uncoment once a view is created for the link to direct to */}
				</li>
				{event.isAdmin ? (
					<li>
						<S.Link to={`/events/${event.eventHash}/invite`}>
							<div className={"imgContainer"}>
								<img src={invite} />
							</div>
							<div>Invite</div>
						</S.Link>
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
		// border: solid red 1px;
		margin-top: 10vh;
		box-sizing: border-box;

		@media (min-width: 750px) {
			flex-direction: row;
			justify-content: space-around;
			margin-top: 30vh;
		}

		.eventName {
			text-transform: uppercase;
			font-family: "Archivo", sans-serif;
			font-size: 50px;
		}

		.firstHalf {
			// border: solid green 1px;
			min-height: 300px;
			width: 350px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: flex-start;

			h1 {
				margin: 0px;
			}

			.addDateButton {
				font-family: "Archivo Black", sans-serif;
				color: red;
				text-transform: uppercase;
				text-decoration: underline;
				font-size: 18px;
			}
		}
		.secondHalf {
			// border: solid blue 1px;
			min-height: 300px;
			width: 350px;
			list-style-type: none;
			padding: 0px;

			display: grid;
			grid-gap: 20px;
			grid-template-columns: 1fr 1fr;
			grid-template-rows: 1fr 1fr;

			li {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				// border: solid black 1px;
			}
		}
	`,
	Link: styled((props) => <Link {...props} />)`
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		width: 100%;
		font-family: "Archivo Black", sans-serif;
		text-transform: uppercase;
		color: #242424;
		text-decoration: none;

		.imgContainer {
			height: 80%;
			width: 100%;
			background-color: #242424;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;
			margin-bottom: 3px;
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
