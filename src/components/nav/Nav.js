import React from "react";
import { useAuth0 } from "../../react-auth0-spa";
import styled from "styled-components";
// import availabilities from "../../media/availabilities.svg";

import logo from "../../media/logo.svg";
import availabilities from "../../media/availabilitiesDark.svg";
import checklist from "../../media/checklistDark.svg";
import dollar from "../../media/dollarDark.svg";
import invite from "../../media/inviteDark.svg";

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

	const returnToolSvg = (tool) => {
		switch (tool) {
			case "availabilities":
				return availabilities;
			case "invite":
				return invite;
			case "checklist":
				return checklist;
			case "costSplit":
				return dollar;
		}
	};

	if (navState === "events") {
		return (
			<S.Container>
				<S.Logo src={logo} />
				<S.NewEventLink to="/events/create">
					<div className={"arrow"}>{`+`}</div>
					{/* // using irrelevant classnames 
					because reusing a different styled component that worked here*/}
					<div className={"eventName"}>NEW EVENT</div>
				</S.NewEventLink>
			</S.Container>
		);
	}
	if (navState === "event") {
		return (
			<S.Container>
				<S.BackLink to={"/events"}>{`< BACK`}</S.BackLink>
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
				<S.Link
					to={backPath}
					// to={"/events"}
					onClick={() => {
						navFuncts(navFunctsValues);
					}}
				>
					<div className={"arrow"}>{`<`}</div>
					<div className={"eventName"}>{eventName}</div>
				</S.Link>

				{/* <span>{tool}</span> */}
				<img className={"svg"} src={returnToolSvg(tool)} />
				{/* <Availabilities fill="242424" /> */}
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
		background-color: #fbf6ef;
		// background-color: black;
		width: 90%;
		position: fixed;
		margin-top: 1vh;
		top: 0;
		height: 58px;
		// min-height: 30px;
		box-sizing: border-box;

		.svg g {
			fill: #242424;
		}
	`,
	Logo: styled.img`
		height: 100%;
	`,
	Link: styled((props) => <Link {...props} />)`
		text-transform: uppercase;
		width: 100px;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		text-decoration: none;
		color: #242424;
		font-size: 22px;

		div {
			box-sizing: border-box;
		}

		.arrow {
			width: 20%;
		}

		.eventName {
			width: 80%;
			line-height: 90%;
		}
	`,
};

S.NewEventLink = styled(S.Link)`
	color: #c36400;
	// border: solid green 1px;
	width: 90px;

	.eventName {
		text-align: center;
		text-decoration: underline;
		line-height: 120%;
	}
`;

S.BackLink = styled(S.Link)`
	font-size: 28px;
`;

export default EventsNav;
