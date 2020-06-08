import React, { useEffect, useState } from "react";
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
	const [color, setColor] = useState("white");
	useEffect(() => {
		if (props.day.date !== "blank" && props.day.availabilitiesCount) {
			// If on render day is not a blank and has availabilities assigned to it, turn day green
			setColor("green");
		} else if (color === "green" && !props.day.availabilitiesCount) {
			// If on render day is green and has no availabilities assigned to it, turn day white
			setColor("white");
		}
	}, [props.day.availabilitiesCount, props.cal, color, props.day.date]);

	if (props.day.date === "blank") {
		return <S.Blank />;
	}

	let dayNumber = props.day.day;

	const handleClick = day => {
		if (props.updateMode) {
			console.log(day);
			// should pass day to a function in `Availabilities.js` that does one of four things
			props.setAddedAvails([{ availabilityStart: day.date }]);
		}
	};

	return (
		<S.Container
			dayHeight={props.dayHeight}
			backgroundColor={color}
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
