import React from "react";
import styled from "styled-components";

const S = {
	Container: styled.div`
		width: 14.2%;
		height: ${props => props.dayHeight};
		border: solid black 1px;
		box-sizing: border-box;
	`,
};

const Day = props => {
	if (props.day === "blank") {
		return <S.Container />;
	}

	let dayNumber = props.day.split(" ")[2];
	return (
		<S.Container dayHeight={props.dayHeight}>
			<span>{dayNumber}</span>
		</S.Container>
	);
};

export default Day;
