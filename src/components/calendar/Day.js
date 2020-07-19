import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

const S = {
	Container: styled.div`
		width: 100%;
		height: 100%;
		// height: ${(props) => props.dayHeight};
		// border: solid black 1px;
		box-sizing: border-box;
		background-color: ${(props) => props.backgroundColor};

		span {
			font-family: "Archivo", sans-serif;
			font-weight: 700;
		}
	`,
	Blank: styled.div`
		width: 100%;
		height: 100%;
		// height: ${(props) => props.dayHeight};
		box-sizing: border-box;
	`,
};

const Day = (props) => {
	const [color, setColor] = useState("#DCE0D9");
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

	const setDynamicColor = () => {
		if (!props.range && props.range !== 0) {
			setColor(colors.color3);
			return;
		}
		let range = props.range;
		let colorKey = props.colorKey;
		let count = props.day.availabilitiesCount;
		let lac = colorKey.leastAvailCount;

		// availabilityCount colors are harcoded if the range between greatest and least is <= 2
		switch (range) {
			case 0:
				setColor(colors.color3);
			case 1:
				if (count === lac) setColor(colors.color2);
				if (count === lac + 1) setColor(colors.color4);
			case 2:
				if (count === lac) setColor(colors.color2);
				if (count === lac + 1) setColor(colors.color3);
				if (count === lac + 2) setColor(colors.color4);
		}

		// availabilityCount colors are formulaic if the range between greatest and least is > 2

		if (range > 2) {
			let {
				percentile0,
				percentile25,
				percentile50,
				percentile75,
				percentile100,
			} = colorKey;

			if (percentile0 <= count && count < percentile25) {
				setColor(colors.color1);
			}
			if (percentile25 <= count && count < percentile50) {
				setColor(colors.color2);
			}
			if (percentile50 <= count && count < percentile75) {
				setColor(colors.color3);
			}
			if (percentile75 <= count && count <= percentile100) {
				setColor(colors.color4);
			}
		}
	};
	useEffect(() => {
		if (props.day.date !== "blank" && props.day.availabilitiesCount) {
			// If on render day is not a blank and has availabilities assigned to it, turn day green
			// setColor(colors.color1);
			setDynamicColor();
		} else if (color in colorsObj && !props.day.availabilitiesCount) {
			// If on render day is green and has no availabilities assigned to it, turn day #DCE0D9
			setColor("#DCE0D9");
		}
	}, [
		props.day.availabilitiesCount,
		props.cal,
		color,
		props.day.date,
		props.updateMode,
	]);

	if (props.day.date === "blank") {
		return <S.Blank />;
	}

	let dayNumber = props.day.day;

	const handleClick = (day) => {
		if (props.updateMode) {
			console.log();
			let action;
			if (color === "#DCE0D9") {
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
			{/* <div>{props.day.availabilitiesCount}</div> */}
		</S.Container>
	);
};

const mapStateToProps = ({ user, events, calendar }) => ({
	updateMode: calendar.updateMode,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default compose(connect(mapStateToProps, mapDispatchToProps))(Day);
