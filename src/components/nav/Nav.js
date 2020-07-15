import React from "react";
import { useAuth0 } from "../../react-auth0-spa";
import styled from "styled-components";
import logo from "../../media/logo.svg";
import availabilities from "../../media/availabilities.svg";

import { Link } from "react-router-dom";

const EventsNav = (props) => {
	const {
		navState,
		backPath,
		tool,
		decrementStep,
		setIsDateKnown,
		navFuncts,
		navFunctsValues,
		eventName,
	} = props;

	if (navState === "events") {
		return (
			<S.Container>
				<S.Logo src={logo} />
				<Link to="/events/create">+NEW EVENT</Link>
			</S.Container>
		);
	}
	if (navState === "event") {
		return (
			<S.Container>
				<Link to={"/events"}>{`< BACK`}</Link>
				<S.Logo src={logo} />
			</S.Container>
		);
	}
	if (navState === "createEvent") {
		if (setIsDateKnown) {
			console.log("last step");
			return (
				<S.Container>
					<button
						onClick={(e) => {
							decrementStep(e);
							setIsDateKnown(false);
						}}
					>
						BACK
					</button>
				</S.Container>
			);
		} else {
			return (
				<S.Container>
					<button
						onClick={(e) => {
							decrementStep(e);
						}}
					>
						BACK
					</button>
				</S.Container>
			);
		}
	}
	if (navState === "tool") {
		console.log("Tool: ", tool);
		return (
			<S.Container>
				<Link
					to={backPath}
					// to={"/events"}
					onClick={() => {
						navFuncts(navFunctsValues);
					}}
				>{`< ${eventName}`}</Link>

				<span>{tool}</span>
			</S.Container>
		);
	}

	// toolNav availabilities back buttons requires a triggering
	// of props.setUpdateMode(false)

	// navState: "",
	// navFuncts: [],
	// backPath: "",
	// tool: "",
	// eventName: ""
};

const S = {
	Container: styled.nav`
		display: flex;
		justify-content: space-between;
		align-items: center;
		// border: solid red 1px;
		padding: 5px;
		width: 100vw;
		position: fixed;
		top: 0;
		// background-color: yellow;
		height: 7vh;
		min-height: 30px;
		box-sizing: border-box;
	`,
	Logo: styled.img`
		height: 100%;
	`,
};

export default EventsNav;
