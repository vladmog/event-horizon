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

		.content {
			width: 100%;
			max-width: 300px;
			// border: solid brown 1px;
			display: flex;
			flex-direction: column;
			align-items: center;

			h2 {
				font-size: 24px;
				margin: 0px;
				// border: solid green 1px;
				align-self: flex-start;
			}

			.radioBtns {
				margin-top: 5vh;
				width: 100%;
				display: flex;
				justify-content: space-around;
				align-items: center;

				.buttonContainer {
					display: flex;
					flex-direction: column;
					align-items: center;

					label {
						margin-top: 1vh;
						font-size: 18px;
					}
				}
			}

			.dateInputs {
				margin-top: 5vh;
				display: flex;
				flex-direction: column;
				width: 100%;
				font-size: 24px;

				.inputContainer {
					display: flex;
					align-items: center;
					justify-content: space-between;

					input {
						background-color: transparent;
						border: solid #242424 1px;
						height: 42px;
					}
				}

				.inputContainer:nth-child(2) {
					margin-top: 1vh;
				}
			}

			.submitBtn {
				margin-top: 12vh;
				align-self: center;

				font-size: 36px;
				border: none;
				background-color: transparent;
				color: #c36400;
				text-decoration: underline;
				box-sizing: border-box;
			}
		}
	`,
};

const Step3 = (props) => {
	return (
		<S.Container>
			<Nav
				navState={"createEvent"}
				decrementStep={props.decrementStep}
				setIsDateKnown={props.setIsDateKnown}
			/>
			<div className={"content"}>
				{/* <button
					onClick={(e) => {
						props.decrementStep(e);
						props.setIsDateKnown(false);
					}}
				>
					BACK
				</button> */}
				<h2>Length of event:</h2>
				<div className={"radioBtns"}>
					<div className={"buttonContainer"}>
						<input
							type="radio"
							id="singleDay"
							name="eventLength"
							value="singleDay"
							defaultChecked
							onChange={() => props.setIsMultiDay(false)}
						/>
						<label>Single day</label>
					</div>
					<div className={"buttonContainer"}>
						<input
							type="radio"
							id="multiDay"
							name="eventLength"
							value="multiDay"
							onChange={() => props.setIsMultiDay(true)}
						/>
						<label>Multi day</label>
					</div>
				</div>

				{props.isMultiDay ? (
					<div className={"dateInputs"}>
						<div className={"inputContainer"}>
							<label>Start-date:</label>
							<input
								type="date"
								name="startDate"
								value={props.startDate}
								onChange={(e) => props.setStartDate(e.target.value)}
							/>
						</div>
						<div className={"inputContainer"}>
							<label>End-date:</label>
							<input
								type="date"
								name="endDate"
								value={props.endDate}
								onChange={(e) => props.setEndDate(e.target.value)}
							/>
						</div>
					</div>
				) : (
					<div className={"dateInputs"}>
						<div className={"inputContainer"}>
							<label>Date:</label>
							<input
								type="date"
								name="startDate"
								value={props.startDate}
								onChange={(e) => props.setStartDate(e.target.value)}
							/>
						</div>
					</div>
				)}
				<button className={"submitBtn"} onClick={(e) => props.createEvent(e)}>
					CREATE EVENT
				</button>
			</div>
		</S.Container>
	);
};

const mapStateToProps = ({ user, events }) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(Step3);
