import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

const S = {
	Container: styled.div`
		width: 14.2%;
		height: ${props => props.dayHeight};
		border: solid black 1px;
		box-sizing: border-box;
		background-color: ${props => props.backgroundColor};
	`,
	Blank: styled.div`
		width: 14.2%;
		height: ${props => props.dayHeight};
		box-sizing: border-box;
	`,
};

const Day = props => {
	if (props.day.date === "blank") {
		return <S.Blank />;
	}

	let dayNumber = props.day.day;

	const handleClick = day => {
		if (props.updateMode) {
			console.log(day);
		}
	};

	return (
		<S.Container
			dayHeight={props.dayHeight}
			backgroundColor={
				props.day.availabilitiesCount > 0 ? "green" : "white"
			}
			onClick={() => handleClick(props.day)}
		>
			<span>{dayNumber}</span>
		</S.Container>
	);
};

const mapStateToProps = ({ user, events, calendar }) => ({
	updateMode: calendar.updateMode,
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default compose(connect(mapStateToProps, mapDispatchToProps))(Day);
