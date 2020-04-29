import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { useAuth0 } from "../../react-auth0-spa";

import { getUser, createUser } from "../../redux/actions";

const FirstLogin = props => {
	const [userName, setUserName] = useState("");
	const { user } = useAuth0();

	const handleSubmit = e => {
		e.preventDefault();

		let userObj = {
			userName: userName,
			emailAddress: user.email,
		};

		props.createUser(props.authToken, userObj);
	};

	return (
		<div>
			<form onSubmit={e => handleSubmit(e)}>
				<h1>Choose a username</h1>
				<input
					name="userName"
					value={userName}
					onChange={e => {
						setUserName(e.target.value);
					}}
				/>
				<button>CONTINUE</button>
			</form>
		</div>
	);
};

const mapStateToProps = ({ user }) => ({
	authToken: user.authToken,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			getUser,
			createUser,
		},
		dispatch
	);

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(FirstLogin);
