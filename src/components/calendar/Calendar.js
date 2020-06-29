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

const Calendar = (props) => {
	let { years } = props.calendar;

	// updates variables used in calculation of day colors
	const [availCountRange, setAvailCountRange] = useState(0); // range between leastAvailCount and greatestAvailCount
	const [leastAvailCount, setLeastAvailCount] = useState(null); // smallest amount of avails in a day
	const [greatestAvailCount, setGreatestAvailCount] = useState(null); // greatest amount of avails in a day
	useEffect(() => {
		console.log("props.calendar.availabilities", props.calendar.availabilities);
		let availabilityCounts = {};
		props.calendar.availabilities.forEach((avail) => {
			if (avail.date in availabilityCounts) {
				availabilityCounts[`${avail.date}`]++;
			} else {
				availabilityCounts[`${avail.date}`] = 1;
			}
			console.log("availabilityCounts:", availabilityCounts);
		});
	}, []);

	const currDateString = new Date().toDateString();
	let currDateArr = currDateString.split(" ");
	let currYear = currDateArr[3];
	let currMonth = currDateArr[1];

	const [refs, setRefs] = useState({});

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
		createRefs();
	}, [years]);

	// Scroll to current date on render
	useEffect(() => {
		// If ref defined for current month, scroll to current month
		if (refs[`${currMonth}${currYear}`]) {
			scrollTo(currMonth, currYear);
		}
	}, [refs, scrollTo, currMonth, currYear]);

	return (
		<S.TempContainer>
			<S.Container>
				{years.map((year) => {
					return (
						<Year
							year={year}
							refs={refs}
							key={Math.random()}
							handleSelect={props.handleSelect}
						/>
					);
				})}
			</S.Container>
		</S.TempContainer>
	);
};

export default Calendar;
