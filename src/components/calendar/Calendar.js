import React, { useState, useEffect, useCallback } from "react";
import Year from "./Year";
import styled from "styled-components";

// Define current date and index of year in calendar array

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

const Calendar = props => {
	let { years, yearIndexes } = props.calendar;

	const currDateString = new Date().toDateString();
	let currDateArr = currDateString.split(" ");
	let currYear = currDateArr[3];
	let currYearIndex = yearIndexes[currYear];
	let currMonth = currDateArr[1];

	const [refs, setRefs] = useState({});
	const createRefs = () => {
		// Create ref for each month to allow scrolling
		let refObj = {};
		for (let i = 0; i < years.length; i++) {
			let year = years[i];
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

	return (
		<S.TempContainer>
			<S.Container>
				{years.map(year => {
					return (
						<Year
							year={year}
							refs={refs}
							key={Math.random()}
							setAddedAvails={props.setAddedAvails}
							addedAvails={props.addedAvails}
						/>
					);
				})}
			</S.Container>
		</S.TempContainer>
	);
};

export default Calendar;
