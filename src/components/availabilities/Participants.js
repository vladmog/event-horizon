import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { useAuth0 } from "../../react-auth0-spa";

const Participants = props => {
	const { user } = useAuth0();
	return (
		<div>
			<h1>Participants</h1>
			{props.eventParticipants.map(participant => {
				return (
					<div key={participant.id}>
						{user.email === participant.emailAddress ? (
							// Host availability
							<div>{participant.userName}</div>
						) : (
							// Participant availability
							<div>{participant.userName}</div>
						)}
					</div>
				);
			})}
		</div>
	);
};

const mapStateToProps = ({ user, events }) => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default compose(connect(mapStateToProps, mapDispatchToProps))(
	Participants
);

// TODO

// If date determined, scroll to event date
// else scroll to current date
