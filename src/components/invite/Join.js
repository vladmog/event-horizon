import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { Link } from "react-router-dom";

const Join = props => {
	let eventHash = props.match.params.eventHash;
	console.log("eventHash in join: ", eventHash);

	return <div>JOIN</div>;
};

const mapStateToProps = ({ user, events }) => ({
	events: events.events,
	eventHashIndexes: events.eventHashIndexes,
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(Join);
