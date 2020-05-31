let ms = 946713600000; // Start date of Jan 1 2000 in milliseconds
let yearsToCreate = 100;
let daysToCreate = 365 * yearsToCreate;

let currYear;
let currMonth;

let years = [];
let yearIndexes = {};

export const monthIndexes = {
	Jan: 0,
	Feb: 1,
	Mar: 2,
	Apr: 3,
	May: 4,
	Jun: 5,
	Jul: 6,
	Aug: 7,
	Sep: 8,
	Oct: 9,
	Nov: 10,
	Dec: 11,
};

for (let i = 0; i < daysToCreate; i++) {
	let d = new Date(ms).toDateString();
	let dArr = d.split(" ");
	let year = dArr[3];
	let month = dArr[1];
	let day = dArr[2];
	let weekDay = dArr[0];

	// Handle new year
	if (year !== currYear) {
		currYear = year;
		// Cache index of year in yearIndexes object
		// i.e: {2000: 0, 2001: 1, 2002: 2}
		let yearIndex = years.length;
		yearIndexes[currYear] = yearIndex;
		// Create new year array
		years.push([]);
	}

	// Handle new month
	if (month !== currMonth) {
		currMonth = month;
		// Create new month array in current year array
		let yearIndex = yearIndexes[currYear];
		years[yearIndex].push([]);
	}

	// Store date string
	let yearIndex = yearIndexes[year];
	let monthIndex = monthIndexes[month];
	years[yearIndex][monthIndex].push({
		date: d,
		month: month,
		year: year,
		day: day,
		weekDay: weekDay,
		availabilities: {},
	});

	// Add a day's worth of milliseconds to date
	ms += 86400000;
}

export const cal = years;
export const yearsIndexes = yearIndexes;
