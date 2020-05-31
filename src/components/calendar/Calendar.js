import React, { useState, useEffect } from "react";
import { cal, yearsIndexes, monthIndexes } from "../../utils/Cal";
import Year from "./Year";
import styled from "styled-components";

const currDateString = new Date().toDateString();
let currDateArr = currDateString.split(" ");
let currYear = currDateArr[3];
let currYearIndex = yearsIndexes[currYear];
let currMonth = currDateArr[1];
let currMonthIndex = monthIndexes[currMonth];
let currDay = currDateArr[2];

// Segment calendar to show only 2 years back and 5 years forward
let displayYears = cal.slice(currYearIndex - 2, currYearIndex + 6);

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
	console.log("years", cal);
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

	useEffect(() => {
		createRefs();
	}, []);

	// Scroll to current date on render
	useEffect(() => {
		// If ref defined for current month, scroll to current month
		if (refs[`${currMonth}${currYear}`]) {
			scrollTo(currMonth, currYear);
		}
	}, [refs]);

	const scrollTo = (month, year) => {
		// Month format: 3 character string i.e. Jan, Feb, Mar
		refs[`${month}${year}`].current.scrollIntoView({
			behavior: "smooth",
			block: "start",
		});
	};

	return (
		<S.TempContainer>
			<S.Container>
				{displayYears.map(year => {
					return <Year year={year} refs={refs} />;
				})}
			</S.Container>
		</S.TempContainer>
	);
};

export default Calendar;
