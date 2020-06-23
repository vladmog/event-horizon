import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { Link } from "react-router-dom";
import { useAuth0 } from "../../react-auth0-spa";


const Invite = props => {
	const { user } = useAuth0();

	let eventHash = props.match.params.eventHash;
	let eventIndex = props.eventHashIndexes[eventHash];
	let event = props.events[eventIndex];
	let eventParticipants = props.eventsParticipants[event.id];
	let usersMet = props.eventsParticipants

	console.log("usersMet", usersMet)


	let currUrl = window.location.href
	// removes `/invite` from current url
	let inviteLink = currUrl.substring(0, currUrl.length - 7) 

	const copyLink = () => {
		  // copies invite link to user clipboard
		  var copyText = document.getElementById("inviteLink");
		  copyText.select();
		  copyText.setSelectionRange(0, 99999);
		  document.execCommand("copy");
		//   alert("Copied the text: " + copyText.value);
	}

	return (
		<div>
			<Link to={`/events/${event.eventHash}`}>{`< ${event.name}`}</Link>
			<h1>INVITE:</h1>
			<input placeholder="search users..." />
			<div /> {/* temporary line break */}
			<button>Get shareable link</button>

			<input id = {"inviteLink"} readOnly value = {inviteLink}/>
			<button onClick = {() => copyLink()}>Copy invite link</button>

			<h2>Invited:</h2>
			<ul>
				{eventParticipants.map((participant) => {
					if (participant.emailAddress !== user.email) {
						return <li>{participant.userName}</li>
						// add remove functionality here
					}
				})}
			</ul>
		</div>
	);
};

const mapStateToProps = ({ user, events }) => ({
	events: events.events,
	eventHashIndexes: events.eventHashIndexes,
	eventsParticipants: events.eventsParticipants
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(Invite);
