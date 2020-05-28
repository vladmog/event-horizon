import React from "react";
import Day from "./Day";

const Month = props => {
	const monthString = props.month[0].split(" ")[1];
	return (
		<div>
			<h3>{monthString}</h3>
			{props.month.map(day => {
				return <Day day={day} />;
			})}
		</div>
	);
};

export default Month;
