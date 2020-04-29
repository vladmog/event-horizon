import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import { getUser } from "../../redux/actions";

const FirstLogin = props => {
	const [username, setUsername] = useState("");
	console.log("username: ", username);

	return (
		<div>
			<form>
				<h1>Choose a username</h1>
				<input
					name="username"
					value={username}
					onChange={e => {
						setUsername(e.target.value);
					}}
				/>
				<button>CONTINUE</button>
			</form>
		</div>
	);
};

const mapStateToProps = ({ user, events }) => ({
	isUserRetrieved: user.isUserRetrieved,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			getUser,
		},
		dispatch
	);

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(FirstLogin);
