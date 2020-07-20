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
		font-family: "Archivo", sans-serif;
		box-sizing: border-box;

		@media (min-width: 750px) {
		}

		.content {
			// border: solid red 1px;
			width: 100%;
			max-width: 275px;
			display: flex;
			flex-direction: column;
			align-items: center;
			box-sizing: border-box;

			form {
				display: flex;
				flex-direction: column;
				align-items: center;
				box-sizing: border-box;
				h1 {
					font-weight: 400;
					color: #242424;
				}
				input {
					width: 100%;
					margin-top: 6vh;
					height: 42px;
					background-color: transparent;
					font-size: 24px;
					border: solid #242424 1px;
					padding: 0px 5px;
					box-sizing: border-box;
				}
				button {
					margin-top: 6vh;
					font-size: 36px;
					border: none;
					background-color: transparent;
					color: #c36400;
					text-decoration: underline;
					box-sizing: border-box;
				}
			}
		}
	`,
};

const Step1 = (props) => {
	return (
		<S.Container>
			<div className={"content"}>
				<form onSubmit={(e) => props.incrementStep(e)}>
					<h1>What is the name of this event?</h1>
					<input
						name="eventName"
						value={props.eventName}
						onChange={(e) => props.setEventName(e.target.value)}
						autoComplete="off"
					/>
					<button>CONTINUE</button>
				</form>
			</div>
		</S.Container>
	);
};

const mapStateToProps = ({ user, events }) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(Step1);
