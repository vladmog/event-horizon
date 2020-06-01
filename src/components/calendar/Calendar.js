import React, { useState, useEffect, useCallback } from "react";
import { Cal } from "../../utils/Cal";
import Year from "./Year";
import styled from "styled-components";

// Generate calendar array
const calendar = new Cal();
calendar.initCal();

// Add event availabilities
calendar.addAvails(
	[
		{ availabilityStart: "Wed Jan 01 2020" },
		{ availabilityStart: "Sat Feb 01 2020" },
	],
	2
);

console.log("added avails: ", calendar);
// calendar.removeAllAvails();
// console.log("removed avails: ", calendar);

// Define current date and index of year in calendar array
const currDateString = new Date().toDateString();
let currDateArr = currDateString.split(" ");
let currYear = currDateArr[3];
let currYearIndex = calendar.yearIndexes[currYear];
let currMonth = currDateArr[1];

// Segment calendar to show only current year and next 3 years
// let displayYears = calendar.years.slice(currYearIndex - 2, currYearIndex + 6);
let displayYears = calendar.years;

const S = {
	TempContainer: styled.div`
		height: 35vh;
		width: 35vh;
		box-sizing: border-box;
	`,
	Container: styled.div`
		// border: solid red 5px;
		height: 100%;
		width: 100%;
		box-sizing: border-box;
		overflow: scroll;
		::-webkit-scrollbar {
			display: none;
		}
	`,
};

const Calendar = () => {
	const [refs, setRefs] = useState({});
	const createRefs = () => {
		// Create ref for each month to allow scrolling
		let refObj = {};
		for (let i = 0; i < displayYears.length; i++) {
			let year = displayYears[i];
			let yearNum = year[0][7].year;
			for (let j = 0; j < year.length; j++) {
				let month = year[j];
				let monthStr = month[7].month;
				// console.log(`${monthStr}${yearNum}`);
				refObj[`${monthStr}${yearNum}`] = React.createRef();
			}
			setRefs(refObj);
		}
	};

	const scrollTo = useCallback(
		(month, year) => {
			refs[`${month}${year}`].current.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		},
		[refs]
	);

	useEffect(() => {
		createRefs();
	}, []);

	// Scroll to current date on render
	useEffect(() => {
		// If ref defined for current month, scroll to current month
		if (refs[`${currMonth}${currYear}`]) {
			scrollTo(currMonth, currYear);
		}
	}, [refs, scrollTo]);

	// const scrollTo = (month, year) => {
	// 	// Month format: 3 character string i.e. Jan, Feb, Mar
	// 	refs[`${month}${year}`].current.scrollIntoView({
	// 		behavior: "smooth",
	// 		block: "start",
	// 	});
	// };

	return (
		<S.TempContainer>
			<S.Container>
				{displayYears.map(year => {
					return <Year year={year} refs={refs} key={Math.random()} />;
				})}
			</S.Container>
		</S.TempContainer>
	);
};

export default Calendar;
