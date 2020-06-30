import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

const S = {
	Container: styled.div`
		width: 14.2%;
		height: ${(props) => props.dayHeight};
		border: solid black 1px;
		box-sizing: border-box;
		background-color: ${(props) => props.backgroundColor};
	`,
	Blank: styled.div`
		width: 14.2%;
		height: ${(props) => props.dayHeight};
		box-sizing: border-box;
	`,
};

const Day = (props) => {
	const [color, setColor] = useState("white");
	const colors = {
		color1: "#FFCE99", // << lightest
		color2: "#FFB05C",
		color3: "#FF931F",
		color4: "#E07400", // << darkest
	};
	const colorsObj = {
		"#FFCE99": true, // << lightest
		"#FFB05C": true,
		"#FF931F": true,
		"#E07400": true, // << darkest
	};
	useEffect(() => {
		if (props.day.date !== "blank" && props.day.availabilitiesCount) {
			// If on render day is not a blank and has availabilities assigned to it, turn day green
			setColor(colors.color1);
		} else if (color in colorsObj && !props.day.availabilitiesCount) {
			// If on render day is green and has no availabilities assigned to it, turn day white
			setColor("white");
		}
	}, [props.day.availabilitiesCount, props.cal, color, props.day.date]);

	if (props.day.date === "blank") {
		return <S.Blank />;
	}

	let dayNumber = props.day.day;

	const handleClick = (day) => {
		if (props.updateMode) {
			console.log();
			let action;
			if (color === "white") {
				action = "add";
			} else if (color in colorsObj) {
				action = "remove";
			}
			props.handleSelect(day, action);
		}
	};

	return (
		<S.Container
			dayHeight={props.dayHeight}
			backgroundColor={color}
			onClick={() => handleClick(props.day)}
		>
			<span>{dayNumber}</span>
			<div>{props.day.availabilitiesCount}</div>
		</S.Container>
	);
};

const mapStateToProps = ({ user, events, calendar }) => ({
	updateMode: calendar.updateMode,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default compose(connect(mapStateToProps, mapDispatchToProps))(Day);
