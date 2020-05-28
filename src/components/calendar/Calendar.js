import React from "react";
import { cal, yearIndexes, monthIndexes } from "../../utils/Cal";
import Year from "./Year";
import styled from "styled-components";

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

const S = {
	TempContainer: styled.div`
		height: 80vh;
		width: 80vh;
		box-sizing: border-box;
	`,
	Container: styled.div`
		border: solid red 5px;
		height: 100%;
		width: 100%;
		box-sizing: border-box;
		overflow: scroll;
	`,
};

const Calendar = () => {
	return (
		<S.TempContainer>
			<S.Container>
				{displayYears.map(year => {
					return <Year year={year} />;
				})}
			</S.Container>
		</S.TempContainer>
	);
};

export default Calendar;
