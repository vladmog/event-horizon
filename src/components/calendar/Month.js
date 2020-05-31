import React from "react";
import Day from "./Day";
import styled from "styled-components";

const S = {
	Container: styled.div`
		height: 8.3%;
		width: 100%;
		// border: solid green 5px;
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

// Adds blank days to beginning of month grid based on first day of month
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
	const monthString = props.month[0].date.split(" ")[1];
	const firstWeekDay = props.month[0].date.split(" ")[0];

	let monthYearString = monthString + props.yearNumber;

	// Add blank days to beginning of month array depending on first day of week
	let month = [...props.month];
	for (let i = 0; i < daysToAdd[firstWeekDay]; i++) {
		month.unshift("blank");
	}

	return (
		<S.Container ref={props.refs[`${monthYearString}`]}>
			<h3>
				{monthString} {props.yearNumber}
			</h3>
			<S.Month>
				{month.map(day => {
					// If month occupies 5 weeks, make height of day square 1/5 of 100%
					let dayHeight = "20%";
					if (month.length > 35) {
						// If month occupies 6 weeks, make height of day square 1/6 of 100%
						dayHeight = "16.6%";
					}
					return <Day day={day} dayHeight={dayHeight} />;
				})}
			</S.Month>
		</S.Container>
	);
};

export default Month;
