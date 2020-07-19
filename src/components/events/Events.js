import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { useAuth0 } from "../../react-auth0-spa";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Nav from "../nav/Nav";

import {
	getUser,
	saveToken,
	setAreAvailsObtained,
	setIsDeletingEvents,
	deleteEvent,
	setIsLeavingEvents,
	leaveEvent,
} from "../../redux/actions";

const Events = (props) => {
	const { user } = useAuth0();
	console.log("user", user);

	useEffect(() => {
		// resets avails obtained when returning from Availability page
		props.setAreAvailsObtained(false);
	}, []);

	const handleDelete = (eventId) => {
		// token, eventId, userId
		props.deleteEvent(props.authToken, eventId, props.userId);
	};

	const handleLeave = (eventId) => {
		props.leaveEvent(props.authToken, eventId, props.userId, props.userId);
	};

	return (
		<S.Container>
			<Nav navState={"events"} />
			<S.Content>
				<S.Half>
					<div className={"cardHeader"}>
						<h3>Your events</h3>
						<button
							onClick={() => props.setIsDeletingEvents(!props.isDeletingEvents)}
						>
							edit
						</button>
					</div>
					<ul>
						{props.events
							.filter((event) => {
								return event.isAdmin == true;
							})
							.map((event) => {
								return (
									<li key={event.id}>
										<div className={"linkContainer"}>
											<S.Link to={`/events/${event.eventHash}`}>
												{/* <Link
											to={`/events/${event.eventHash}/availabilities`}
										> */}
												{event.name}
											</S.Link>
										</div>
										{props.isDeletingEvents && (
											<button onClick={() => handleDelete(event.id)}>x</button>
										)}
									</li>
								);
							})}
					</ul>
				</S.Half>
				<S.SecondHalf>
					<div className={"cardHeader"}>
						<h3>Others' events</h3>
						<button
							onClick={() => props.setIsLeavingEvents(!props.isLeavingEvents)}
						>
							edit
						</button>
					</div>
					<ul>
						{props.events
							.filter((event) => {
								return event.isAdmin == false;
							})
							.map((event) => {
								return (
									<li key={event.id}>
										<div className={"linkContainer"}>
											<S.Link to={`/events/${event.eventHash}`}>
												{/* <Link
												to={`/events/${event.eventHash}/availabilities`}
											> */}
												{event.name}
											</S.Link>
										</div>
										{props.isLeavingEvents && ( // make this conditional off of a different state machine variable indicating leaving others' events
											<button onClick={() => handleLeave(event.id)}>x</button>
										)}
									</li>
								);
							})}
					</ul>
				</S.SecondHalf>
			</S.Content>
		</S.Container>
	);
};

const S = {
	Container: styled.div`
		width: 90%;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		// height: 80vh;
		// border: solid green 1px;
	`,
	Content: styled.div`
		display: flex;
		flex-direction: column;
		// border: solid black 1px;
		width: 100%;
		max-width: 375px;
		// padding: 10px;
		box-sizing: border-box;
		margin-top: 20vh;

		@media (min-width: 750px) {
			flex-direction: row;
			max-width: 1000px;
			width: 80vw;
			justify-content: space-between;
			margin-top: 30vh;
		}
	`,
	Half: styled.div`
		width: 100%;
		// border: solid purple 1px;

		@media (min-width: 750px) {
			max-width: 300px;
		}

		.cardHeader {
			display: flex;
			width: 100%;
			box-sizing: border-box;
			// border: solid pink 1px;
			justify-content: space-between;

			h3 {
				margin: 0px;
				text-transform: uppercase;
				// border: solid green 1px;
				width: calc(100% - 35px);
				font-size: 45px;
				color: #242424;
				line-height: 1;
			}

			button {
				text-decoration: underline;
				background-color: #fbf6ef;
				border: none;
				font-size: 24px;
			}
		}

		ul {
			width: 100%;
			padding: 0px;
			list-style: none;

			li {
				width: 100%;
				min-height: 30px;
				display: flex;

				.linkContainer {
					width: calc(100% - 35px);
					border-bottom: solid #676767 1px;
					display: flex;
					align-items: center;
					height: 50px;
				}

				button {
					width: 27px;
					height: 27px;
					margin: 0px;
				}
			}
		}
	`,

	Link: styled((props) => <Link {...props} />)`
		text-decoration: none;
		color: #242424;
		font-size: 24px;
	`,
};

S.SecondHalf = styled(S.Half)`
	margin-top: 5vh;
	@media (min-width: 750px) {
		margin-top: 0px;
	}
`;

const mapStateToProps = ({ user, events }) => ({
	isUserRetrieved: user.isUserRetrieved,
	isNewUser: user.isNewUser,
	events: events.events,
	isDeletingEvents: events.isDeletingEvents,
	authToken: user.authToken,
	userId: user.userId,
	isLeavingEvents: events.isLeavingEvents,
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			getUser,
			saveToken,
			setAreAvailsObtained,
			setIsDeletingEvents,
			deleteEvent,
			setIsLeavingEvents,
			leaveEvent,
		},
		dispatch
	);

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(Events);
