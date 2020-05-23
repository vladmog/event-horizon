import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { useAuth0 } from "../../react-auth0-spa";

const Event = props => {
	console.log("event props: ", props);
	return <div>{props.location.state.name}</div>;
};

const mapStateToProps = ({ user, events }) => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(Event);
