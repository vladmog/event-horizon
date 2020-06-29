import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { useAuth0 } from "../../react-auth0-spa";
import { setUpdateMode } from "../../redux/actions";
import styled from "styled-components";

const S = {
	Name: styled.button`
		color: ${(props) => props.color};
	`,
};

const Participants = (props) => {
	const { user } = useAuth0();
	if (!props.eventParticipants) {
		return (
			<div>
				<h1>Participants</h1>
				<h4>No participants</h4>
			</div>
		);
	}
	// pass in dispUserIds as props in Availabilities.js
	// look up how to stop VS Code from autocompleting words with the wrong thing
	const clickHandler = (participant) => {
		props.setIsShowcasing(true);
		// console.log("participant", participant);
		if (participant.userId in props.dispUserIdsObj) {
			// console.log("remove user clickhandler");
			// if selected user ID being showcased, remove from showcase
			let newDispUserIdsObj = { ...props.dispUserIdsObj };
			delete newDispUserIdsObj[`${participant.userId}`];
			let newDispUserIds = props.dispUserIds.filter((id) => {
				return id !== participant.userId;
			});
			props.setDispUserIds(newDispUserIds);
			props.setDispUserIdsObj(newDispUserIdsObj);
			props.setLastDispUserRemoved(participant.userId);
		} else {
			// console.log("add user clickhandler");
			// if selected user ID not being showcased, showcase user
			// props.setDispUserIds([...props.dispUserIds, participant.userId]); // uncomment to isolate multiple users concurrently
			props.setDispUserIds([participant.userId]); // uncomment to isolate a single user at a time
			// props.setDispUserIdsObj({
			// 	...props.dispUserIdsObj,
			// 	[participant.userId]: true,  // uncomment to isolate multiple users concurrently
			// });
			props.setDispUserIdsObj({
				[participant.userId]: true, // uncomment to isolate a single user at a time
			});
		}
	};
	return (
		<div>
			<h1>Participants</h1>
			{props.eventParticipants.map((participant) => {
				// Default username styling
				let color = "#242424";
				let font = "Archivo";
				let fontWeight = "bold";
				console.log("===================");
				console.log("truth serum", participant.id in props.dispUserIdsObj);
				console.log("participant.id", participant.id);
				console.log("props.dispUserIdsObj", props.dispUserIdsObj);

				// Handles dynamic styling of user names if in showcasing mode
				if (participant.userId in props.dispUserIdsObj && props.isShowcasing) {
					// If user being showcased
					font = "Archivo Black";
					fontWeight = "regular";
				} else if (props.isShowcasing) {
					// If user not being showcased
					color = "#959494";
				}
				return (
					<div key={participant.id}>
						{user.email === participant.emailAddress ? (
							// Host availability
							<div>
								<S.Name
									color={color}
									onClick={() => {
										// props.setUpdateMode(true);
										clickHandler(participant);
									}}
								>
									{participant.userName} - you
								</S.Name>
								<button onClick={() => props.setUpdateMode(true)}>
									update
								</button>
							</div>
						) : (
							// Participant availability
							<S.Name color={color} onClick={() => clickHandler(participant)}>
								{participant.userName}
							</S.Name>
						)}
					</div>
				);
			})}
		</div>
	);
};

const mapStateToProps = ({ user, events, calendar }) => ({
	updateMode: calendar.updateMode,
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators({ setUpdateMode }, dispatch);

export default compose(connect(mapStateToProps, mapDispatchToProps))(
	Participants
);

// TODO

// If date determined, scroll to event date
// else scroll to current date
