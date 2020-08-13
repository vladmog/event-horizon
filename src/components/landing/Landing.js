import React from "react";
import { useAuth0 } from "../../react-auth0-spa";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { Cal } from "../../utils/Cal";
import { getUser } from "../../redux/actions";
import styled from "styled-components";
import logo from "../../media/logo.svg";
import { Link } from "react-router-dom";

const S = {
	Container: styled.div`
		width: 90vw;
		max-width: 375px;
		box-sizing: border-box;
		// border: solid green 2px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: 25vh;

		@media (min-width: 750px) {
			margin-top: 30vh;
		}

		button {
			background-color: #fbf6ef;
			border: none;
			// border: solid black 1px;
			color: #c36400;
			width: 70%;
			height: 80px;
			font-size: 38px;
			font-weight: 600;
		}
	`,
	Logo: styled.img`
		width: 90%;
	`,
};

const Landing = props => {
	const { loginWithRedirect, logout, user } = useAuth0();
	const currentUrl = window.location.href;
	console.log("user", user);

	return (
		<S.Container>
			{user && <button onClick={() => logout()}>LOGOUT</button>}

			<S.Logo src={logo} />
			{/* <h2>an event planner</h2>
			<section>
				<h3>AVAILABILITY</h3>
				<div>See days where everyone is free at a glance</div>
			</section>
			<section>
				<h3>COST SPLIT</h3>
				<div>Divide group costs evenly</div>
			</section>
			<section>
				<h3>CHECKLIST</h3>
				<div>Ensure nothing is forgotten</div>
			</section> */}
			<h3>A damn simple event planner</h3>
			{!user ? (
				<button
					onClick={() =>
						loginWithRedirect({
							redirect_uri: `${currentUrl}events`,
						})
					}
				>
					<u>SIGN IN</u>
				</button>
			) : (
				<Link to={"/events"}>ENTER</Link>
			)}
		</S.Container>
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
)(Landing);
