import React from "react";
import Day from "./Day";
import styled from "styled-components";

const S = {
	Container: styled.div`
		height: 8.3%;
		width: 100%;
		border: solid green 5px;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	`,
	Month: styled.div`
		width: 100%;
		height: 90%;
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
	`,
};

const daysToAdd = {
	Sun: 0,
	Mon: 1,
	Tue: 2,
	Wed: 3,
	Thu: 4,
	Fri: 5,
	Sat: 6,
};

const Month = props => {
	const monthString = props.month[0].split(" ")[1];
	const firstWeekDay = props.month[0].split(" ")[0];

	for (let i = 0; i < daysToAdd[firstWeekDay]; i++) {
		props.month.unshift("blank");
	}

	return (
		<S.Container>
			<h3>
				{monthString} {props.yearNumber}
			</h3>
			<S.Month>
				{props.month.map(day => {
					let dayHeight = "20%";
					if (props.month.length > 35) {
						dayHeight = "16.6%";
					}
					return <Day day={day} dayHeight={dayHeight} />;
				})}
			</S.Month>
		</S.Container>
	);
};

export default Month;
