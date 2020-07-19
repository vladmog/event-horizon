import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { Link } from "react-router-dom";
import { useAuth0 } from "../../react-auth0-spa";
import styled from "styled-components";
import { searchUser, inviteUser, uninviteUser } from "../../redux/actions";
import Nav from "../nav/Nav";
import searchIcon from "../../media/search.svg";
import deleteIcon from "../../media/delete.svg";

const S = {
	Container: styled.div`
		width: 90%;
		display: flex;
		flex-direction: column;
		align-items: center;

		.content {
			// border: solid red 1px;
			display: flex;
			flex-direction: column;
			width: 100%;
			margin-top: 15vh;

			@media (min-width: 750px) {
				flex-direction: row;
				justify-content: space-around;
				margin-top: 30vh;
			}

			.firstHalf {
				min-height: 200px;
				// border: solid red 1px;

				.getLinkButton {
					border: none;
					background-color: transparent;
					text-decoration: underline;
					font-family: "Archivo", sans-serif;
					font-size: 24px;
					font-weight: 400;
					margin-top: 3vh;
				}

				h1 {
					text-transform: uppercase;
					font-family: "Archivo", sans-serif;
					font-size: 48px;
				}

				@media (min-width: 750px) {
					min-height: 300px;
					min-width: 350px;
				}
			}
			.secondHalf {
				min-height: 200px;
				// border: solid red 1px;
				h1 {
					text-transform: uppercase;
					font-family: "Archivo", sans-serif;
					font-size: 48px;
				}
				@media (min-width: 750px) {
					min-height: 300px;
					width: 350px;
				}
				ul {
					// border: solid black 1px;
					list-style-type: none;
					padding: 0px;
					li {
						// border: solid red 1px;
						display: flex;
						justify-content: space-between;
						align-items: center;
						height: 30px;
						font-size: 24px;
						button {
							background-color: transparent;
							border: none;
							display: flex;
							justify-content: center;
							align-items: center;
							box-sizing: border-box;
							// border: solid purple 1px;
							img {
								width: 80%;
								// border: solid green 1px;
								box-sizing: border-box;
								cursor: pointer;
							}
						}
					}
				}
			}
		}
	`,
	InputContainer: styled.form`
		// border: solid red 1px;
		width: 100%;
		height: 44px;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		flex-direction: column;

		.svgAndInput {
			height: 44px;
			width: 100%;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			border: solid black 1px;

			img {
				height: 60%;
				margin: 0px 5px;
				box-sizing: border-box;
			}

			input {
				height: 100%;
				width: 100%;
				// border: solid green 1px;
				border: none;
				box-sizing: border-box;
				background-color: transparent;
				font-size: 24px;
			}
		}
	`,
	DropDown: styled.div`
		box-sizing: border-box;
		width: 100%;
		// background-color: yellow;

		div {
			box-sizing: border-box;
			border: solid purple 1px;
			height: 100px;
			display: ${(props) => props.display};
		}
	`,
};

const Invite = (props) => {
	const [isDispDropDown, setIsDispDropdown] = useState(false);
	const [isDispLink, setIsDispLink] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const { user } = useAuth0();

	// Get event information on render
	let eventHash = props.match.params.eventHash;
	let eventIndex = props.eventHashIndexes[eventHash];
	let event = props.events[eventIndex];

	// Isolate event participants from all users met. Array for mapping, object for efficient reference
	let eventParticipants = props.eventsParticipants[event.id];
	let eventParticipantsObj = {};
	eventParticipants.forEach((participant) => {
		eventParticipantsObj[`${participant.userId}`] = true;
	});

	// Isolate users met not invited to this event. Array for mapping, object for efficient reference
	let acquaintances = [];
	let acquaintancesObj = {};

	// If user met in another event not in this event or not already in acquaintances, add to acquaintances.
	let eParticipants;
	for (eParticipants in props.eventsParticipants) {
		props.eventsParticipants[`${eParticipants}`].forEach((participant) => {
			if (
				!(participant.userId in eventParticipantsObj) &&
				!(participant.userId in acquaintancesObj)
			) {
				acquaintances.push(participant);
				acquaintancesObj[`${participant.userId}`] = true;
			}
		});
	}

	// Define invite link
	let currUrl = window.location.href;
	// removes `/invite` from current url
	let inviteLink = currUrl.substring(0, currUrl.length - 7);

	const copyLink = () => {
		// copies invite link to user clipboard
		var copyText = document.getElementById("inviteLink");
		copyText.select();
		copyText.setSelectionRange(0, 99999);
		document.execCommand("copy");
		//   alert("Copied the text: " + copyText.value);
	};

	const handleBlur = (e) => {
		console.log("e", e.target);
		if (!(e.target.id === "dd")) {
			// Pseudo `onBlur` that only runs if item clicked on isn't part of dropdown
			setIsDispDropdown(false);
		}
	};

	const searchSubmit = (e) => {
		e.preventDefault();
		console.log("search: ", searchTerm);
		props.searchUser(props.authToken, searchTerm);
	};

	const invite = (e, userId) => {
		e.preventDefault();
		console.log("event", event);
		let adminId = props.userId;
		props.inviteUser(props.authToken, event.id, userId, adminId);
	};

	const remove = (userId) => {
		console.log("delete userId: ", userId);
		let adminId = props.userId;
		props.uninviteUser(props.authToken, event.id, userId, adminId);
	};

	return (
		<S.Container onClick={(e) => handleBlur(e)}>
			<Nav
				navState={"tool"}
				tool={"invite"}
				backPath={`/events/${eventHash}`}
				navFuncts={function () {}}
				navFunctsValues={false}
				eventName={event.name}
			/>
			<div className={"content"}>
				<div className={"firstHalf"}>
					<h1>INVITE:</h1>
					{/* usersMet that are not in given event participants */}
					<S.InputContainer
						onClick={() => setIsDispDropdown(true)}
						onSubmit={(e) => {
							searchSubmit(e);
						}}
					>
						<div className={"svgAndInput"}>
							<img src={searchIcon} />
							<input
								id="dd"
								placeholder="search users..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								autoComplete="off"
							/>
						</div>
					</S.InputContainer>
					<S.DropDown display={isDispDropDown ? "block" : "none"}>
						<div id={"dd"}>
							{/* If user searched for not found */}
							{props.searchResult === false && props.searchResult !== null && (
								<li id="dd" style={{ color: "red" }}>
									{searchTerm} not found
								</li>
							)}

							{/* If search term returned result, show result */}
							{props.searchResult && (
								<li
									style={{ color: "blue" }}
									id="dd"
									key={`${props.searchResult.userName}`}
									onClick={() => console.log(props.searchResult.userName)}
								>
									<span id="dd">{props.searchResult.userName}</span>
									<button
										onClick={(e) => invite(e, props.searchResult.id)}
										id="dd"
										type="button"
									>
										ADD
									</button>
								</li>
							)}

							{/* Render acquaintances */}
							{acquaintances.map((acquaintance) => {
								return (
									<li
										id="dd"
										key={`${acquaintance.userName}`}
										onClick={() => console.log(acquaintance.userName)}
									>
										<span>{acquaintance.userName}</span>
										<button
											onClick={(e) => invite(e, acquaintance.userId)}
											id="dd"
											type="button"
										>
											ADD
										</button>
									</li>
								);
							})}
						</div>
					</S.DropDown>
					<div /> {/* temporary line break */}
					<button
						className={"getLinkButton"}
						onClick={() => setIsDispLink(true)}
					>
						Get shareable link
					</button>
					{isDispLink && (
						<div>
							<input id={"inviteLink"} readOnly value={inviteLink} />
							<button onClick={() => copyLink()}>Copy invite link</button>
						</div>
					)}
				</div>

				<div className={"secondHalf"}>
					<h1>Invited:</h1>
					{/* users that are in given event participants */}
					<ul>
						{eventParticipants.map((participant) => {
							if (participant.emailAddress !== user.email) {
								return (
									<li>
										<span>{participant.userName}</span>
										<button onClick={() => remove(participant.userId)}>
											<img src={deleteIcon} />
										</button>
									</li>
								);
								// add remove functionality here
							}
						})}
					</ul>
				</div>
			</div>
		</S.Container>
	);
};

const mapStateToProps = ({ user, events }) => ({
	events: events.events,
	eventHashIndexes: events.eventHashIndexes,
	eventsParticipants: events.eventsParticipants,
	authToken: user.authToken,
	searchResult: user.searchResult,
	userId: user.userId,
	emailAddress: user.emailAddress,
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators({ searchUser, inviteUser, uninviteUser }, dispatch);

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(Invite);
