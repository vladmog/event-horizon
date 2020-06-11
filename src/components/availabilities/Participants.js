import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { useAuth0 } from "../../react-auth0-spa";
import { setUpdateMode } from "../../redux/actions";

const Participants = props => {
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
	const clickHandler = participant => {
		console.log("participant", participant);
		if (participant.userId in props.dispUserIdsObj) {
			// if selected user ID being showcased, remove from showcase
			let newDispUserIdsObj = { ...props.dispUserIdsObj };
			delete newDispUserIdsObj[`${participant.userId}`];
			let newDispUserIds = props.dispUserIds.filter(id => {
				return id !== participant.userId;
			});
			props.setDispUserIds(newDispUserIds);
			props.setDispUserIdsObj(newDispUserIdsObj);
			props.setLastDispUserRemoved(participant.userId);
		} else {
			// if selected user ID not being showcased, showcase user
			props.setDispUserIds([...props.dispUserIds, participant.userId]);
			props.setDispUserIdsObj({
				...props.dispUseIdsObj,
				[participant.userId]: true,
			});
		}
	};
	return (
		<div>
			<h1>Participants</h1>
			{props.eventParticipants.map(participant => {
				return (
					<div key={participant.id}>
						{user.email === participant.emailAddress ? (
							// Host availability
							<button
								onClick={() => {
									// props.setUpdateMode(true);
									clickHandler(participant);
								}}
							>
								{participant.userName} - you
							</button>
						) : (
							// Participant availability
							<button onClick={() => clickHandler(participant)}>
								{participant.userName}
							</button>
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

const mapDispatchToProps = dispatch =>
	bindActionCreators({ setUpdateMode }, dispatch);

export default compose(connect(mapStateToProps, mapDispatchToProps))(
	Participants
);

// TODO

// If date determined, scroll to event date
// else scroll to current date
