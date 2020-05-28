import React from "react";
import Month from "./Month";

const Year = props => {
	const yearNumber = props.year[0][0].split(" ")[3];

	return (
		<div>
			<h1>{yearNumber}</h1>
			{props.year.map(month => {
				return <Month month={month} />;
			})}
		</div>
	);
};

export default Year;
