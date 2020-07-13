import React from "react";
import { useAuth0 } from "../../react-auth0-spa";
import styled from "styled-components";

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
				<Link to="/events/create">+NEW EVENT</Link>
			</S.Container>
		);
	}
	if (navState === "event") {
		return (
			<S.Container>
				<Link to={"/events"}>BACK</Link>
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
		padding: 1vw;
		border: solid red 1px;
		width: 100vw;
		position: fixed;
		top: 0;
		background-color: yellow;
	`,
};

export default EventsNav;
