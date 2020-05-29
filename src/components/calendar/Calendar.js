import React, { useState, useEffect } from "react";
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
	const [refs, setRefs] = useState({});
	const createRefs = () => {
		let refObj = {};
		for (let i = 0; i < displayYears.length; i++) {
			let year = displayYears[i];
			let yearNum = year[0][7].split(" ")[3];
			for (let j = 0; j < year.length; j++) {
				let month = year[j];
				let monthStr = month[7].split(" ")[1];
				// console.log(`${monthStr}${yearNum}`);
				refObj[`${monthStr}${yearNum}`] = React.createRef();
			}
			setRefs(refObj);
		}
	};

	useEffect(() => {
		createRefs();
	}, []);

	const scrollTo = () => {
		refs["May2020"].current.scrollIntoView({
			behavior: "smooth",
			block: "start",
		});
		console.log(refs["May2020"]);
	};

	return (
		<S.TempContainer>
			<S.Container>
				{displayYears.map(year => {
					return <Year year={year} refs={refs} />;
				})}
			</S.Container>
			<button onClick={() => scrollTo()}>Scroll to May 2020</button>
		</S.TempContainer>
	);
};

export default Calendar;
