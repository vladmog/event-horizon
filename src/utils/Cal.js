export class Cal {
	constructor() {
		this.years = [];
		this.availabilities = [];
		this.availabilitiesObj = {};
		this.yearIndexes = {};
		this.monthIndexes = {
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
	}
	initCal() {
		console.log("init");
		let ms = 1577936800000; // Set milliseconds of Jan 01 of a year. If date is not Jan 01, app will break.
		let yearsToCreate = 3;
		let daysToCreate = 365 * yearsToCreate;

		let currYear;
		let currMonth;

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
				let yearIndex = this.years.length;
				this.yearIndexes[currYear] = yearIndex;
				// Create new year array
				this.years.push([]);
			}

			// Handle new month
			if (month !== currMonth) {
				currMonth = month;
				// Create new month array in current year array
				let yearIndex = this.yearIndexes[currYear];
				this.years[yearIndex].push([]);
			}

			// Store date string
			let yearIndex = this.yearIndexes[year];
			let monthIndex = this.monthIndexes[month];
			this.years[yearIndex][monthIndex].push({
				id: i,
				date: d,
				month: month,
				year: year,
				day: day,
				weekDay: weekDay,
				availabilities: {},
				availabilitiesCount: 0,
			});

			// Add a day's worth of milliseconds to date
			ms += 86400000;
		}
		return {
			years: this.years,
			availabilities: this.availabilities,
			yearIndexes: this.yearIndexes,
			monthIndexes: this.monthIndexes,
		};
	}
	addAvails(dates, userId) {
		console.log("addAvails");
		for (let i = 0; i < dates.length; i++) {
			// Convert date string into indexes pointing to corresponding location in years array
			let dateArr = dates[i].availabilityStart.split(" ");
			let month = dateArr[1];
			let monthIndex = this.monthIndexes[month];
			let year = dateArr[3];
			let yearIndex = this.yearIndexes[year];
			let day = dateArr[2];
			let dayIndex = day - 1;

			// Update availabilities object for date
			this.years[yearIndex][monthIndex][dayIndex].availabilities[
				`${userId}`
			] = true;
			this.years[yearIndex][monthIndex][dayIndex].availabilitiesCount++;

			// Cache availability
			this.availabilities.push({
				userId: userId,
				date: dates[i].availabilityStart,
				yearIndex: yearIndex,
				monthIndex: monthIndex,
				dayIndex: dayIndex,
			});
		}
		return {
			years: this.years,
			availabilities: this.availabilities,
			yearIndexes: this.yearIndexes,
			monthIndexes: this.monthIndexes,
		};
	}
	isolateUserAvails(userId) {
		console.log("isolateUserAvails");
		let userAvails = [];
		this.availabilities.forEach(avail => {
			if (avail.userId !== userId) {
				delete this.years[avail.yearIndex][avail.monthIndex][
					avail.dayIndex
				].availabilities[`${avail.userId}`];
				this.years[avail.yearIndex][avail.monthIndex][avail.dayIndex]
					.availabilitiesCount--;
			} else {
				userAvails.push(avail);
			}
		});
		this.availabilities = userAvails;
		return {
			years: this.years,
			availabilities: this.availabilities,
			yearIndexes: this.yearIndexes,
			monthIndexes: this.monthIndexes,
		};
	}
	removeAllAvails() {
		console.log("removeAllAvails");
		this.availabilities.forEach(avail => {
			delete this.years[avail.yearIndex][avail.monthIndex][avail.dayIndex]
				.availabilities[`${avail.userId}`];
		});
		this.availabilities = [];
	}
}
