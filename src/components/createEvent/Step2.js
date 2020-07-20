import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import Nav from "../nav/Nav";
import styled from "styled-components";

const S = {
	Container: styled.div`
		width: 90%;
		// border: solid green 1px;
		margin-top: 30vh;
		display: flex;
		flex-direction: column;
		align-items: center;

		.content {
			// border: solid red 1px;
			width: 100%;
			max-width: 375px;
			display: flex;
			flex-direction: column;
			align-items: center;

			h1 {
				font-family: "Archivo", sans-serif;
				font-weight: 400;
				// border: solid red 1px;
				width: 85%;
				color: #242424;
			}

			.buttonsContainer {
				// border: solid red 1px;
				display: flex;
				justify-content: space-around;
				width: 100%;
				margin-top: 12vh;

				button {
					text-transform: uppercase;
					font-size: 36px;
					border: none;
					text-decoration: underline;
					background-color: transparent;
				}

				button:nth-child(1) {
					color: green;
				}
				button:nth-child(2) {
					color: red;
				}
			}
		}
	`,
};

const Step2 = (props) => {
	return (
		<S.Container>
			<Nav navState={"createEvent"} decrementStep={props.decrementStep} />
			<div className={"content"}>
				{/* <button onClick={(e) => props.decrementStep(e)}>BACK</button> */}
				<h1>Is the date(s) for this event decided?</h1>
				<div className={"buttonsContainer"}>
					<button
						onClick={(e) => {
							props.incrementStep(e);
							props.setIsDateKnown(true);
						}}
					>
						YES
					</button>
					<button onClick={() => props.createEvent()}>NO</button>
				</div>
			</div>
		</S.Container>
	);
};

const mapStateToProps = ({ user, events }) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(Step2);
