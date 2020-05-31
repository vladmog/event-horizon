import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { Link, Redirect } from "react-router-dom";
import styled from "styled-components";
import Calendar from "../calendar/Calendar";

const Availabilities = props => {
	return (
		<div>
			<h1>Availabilities</h1>
			<Calendar />
		</div>
	);
};

const mapStateToProps = ({ user, events }) => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default compose(connect(mapStateToProps, mapDispatchToProps))(
	Availabilities
);

// TODO

// If date determined, scroll to event date
// else scroll to current date
