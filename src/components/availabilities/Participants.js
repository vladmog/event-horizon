import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { useAuth0 } from "../../react-auth0-spa";
import { setUpdateMode } from "../../redux/actions";

const Participants = props => {
	const { user } = useAuth0();
	return (
		<div>
			<h1>Participants</h1>
			{props.eventParticipants.map(participant => {
				return (
					<div key={participant.id}>
						{user.email === participant.emailAddress &&
						participant.isAdmin ? (
							// Host availability
							<button
								onClick={() => {
									props.setUpdateMode(true);
								}}
							>
								{participant.userName}
							</button>
						) : (
							// Participant availability
							<button>{participant.userName}</button>
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
