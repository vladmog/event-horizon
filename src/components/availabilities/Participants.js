import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

const Participants = props => {
	return (
		<div>
			<h1>Participants</h1>
			{props.eventParticipants.map(participant => {
				console.log("participant", participant);
				return (
					<div key={participant.id}>
						<div>{participant.userName}</div>
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
