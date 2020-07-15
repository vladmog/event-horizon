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

		h3 {
			align-self: flex-start;
			text-transform: uppercase;
			font-family: "Archivo", sans-serif;
			font-weight: 400;
			font-size: 30px;
		}
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

const Month = (props) => {
	const monthString = props.month[0].month;
	const firstWeekDay = props.month[0].weekDay;

	let monthYearString = monthString + props.yearNumber;

	// Add blank days to beginning of month array depending on first day of week
	let month = [...props.month];
	let blankId = -1;
	for (let i = 0; i < daysToAdd[firstWeekDay]; i++) {
		month.unshift({
			date: "blank",
			id: blankId,
		});
		blankId++;
	}

	let abrevToFullMonth = {
		Jan: "January",
		Feb: "February",
		Mar: "March",
		Apr: "April",
		May: "May",
		Jun: "June",
		Jul: "July",
		Aug: "August",
		Sep: "September",
		Oct: "October",
		Nov: "November",
		Dec: "December",
	};

	return (
		<S.Container ref={props.refs[`${monthYearString}`]}>
			<h3>{abrevToFullMonth[`${monthString}`]}</h3>
			<S.Month>
				{month.map((day) => {
					// If month occupies 5 weeks, make height of day square 1/5 of 100%
					let dayHeight = "20%";
					if (month.length > 35) {
						// If month occupies 6 weeks, make height of day square 1/6 of 100%
						dayHeight = "16.6%";
					}
					return (
						<Day
							cal={props.cal}
							day={day}
							dayHeight={dayHeight}
							key={Math.random()}
							handleSelect={props.handleSelect}
							colorKey={props.colorKey}
							range={props.range}
						/>
					);
				})}
			</S.Month>
		</S.Container>
	);
};

export default Month;
