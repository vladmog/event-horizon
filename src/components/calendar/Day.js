import React from "react";
import styled from "styled-components";

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
	if (props.day === "blank") {
		return <S.Blank />;
	}

	let dayNumber = props.day.day;

	return (
		<S.Container
			dayHeight={props.dayHeight}
			backgroundColor={
				props.day.availabilitiesCount > 0 ? "green" : "white"
			}
			onClick={() => console.log(props.day)}
		>
			<span>{dayNumber}</span>
		</S.Container>
	);
};

export default Day;
