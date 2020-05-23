import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { useAuth0 } from "../../react-auth0-spa";
import { Link } from "react-router-dom";

const Event = props => {
	let event = props.location.state;
	return (
		<div>
			<Link to={"/events"}>BACK</Link>
			<div>{event.name}</div>
			<div>Date: {event.startDate || "To be determined"}</div>
			<div>Invited (come back to this)</div>
		</div>
	);
};

const mapStateToProps = ({ user, events }) => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(Event);
