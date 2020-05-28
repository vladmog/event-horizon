import React from "react";
import { cal, yearIndexes, monthIndexes } from "../../utils/Cal";
import Year from "./Year";

const currDateString = new Date().toDateString();
let currDateArr = currDateString.split(" ");
let currYear = currDateArr[3];
let currYearIndex = yearIndexes[currYear];
let currMonth = currDateArr[1];
let currMonthIndex = monthIndexes[currMonth];
let currDay = currDateArr[2];

// console.log(cal[currYearIndex][currMonthIndex]);

// Segment calendar to show only 2 years back and 5 years forward
let displayYears = cal.slice(currYearIndex - 2, currYearIndex + 6);

const Calendar = () => {
	return (
		<div>
			{displayYears.map(year => {
				return <Year year={year} />;
			})}
		</div>
	);
};

export default Calendar;
