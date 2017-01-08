/**
 * @summary medication.js specifies how the application's state will change in response to an
 * action. The reducer has to be pure meaning it should calculate the next state and return it.
 * It shouldn't mutate the state.
 *
 */

import actions from '../actions/medication';

const initialState = {
	medications: [],
	loading: false,
	error: null,
	sunFlag: false,
	monFlag: false,
	tueFlag: false,
	wedFlag: false,
	thuFlag: false,
	friFlag: false,
	satFlag: false,
	username: null,
	password: null,
	signUpSuccess: false,
}

/**
 * getNextDayOfWeek() will get the next day of the week based on the date parameter and
 * the dayOfWeek parameter.
 *
 * @param {date} date - A date in Date format.
 * @param {number} dayOfWeek - A number, 0-6, that represents a day of the week.
 * @return {date} date - A date in Date format.
 */
const getNextDayOfWeek = (date, dayOfWeek) => {
	date = new Date(date.getTime());
	date.setDate(date.getDate() + (dayOfWeek + 7 - date.getDay()) % 7);
	return date;
}

/**
 * parseTime() parse the time based on ":". So 10:00:00 will equal ["10", "00", "00"]
 *
 * @param {string} time - A time in **:** or **:**:** format.
 * @return {array} timeArray - An array of strings.
 */
const parseTime = (time) => {
	time = time + ":00";
	let timeArray = time.split(":");
	return timeArray;
}

/**
 * newDay() will take a time, in **:** format, and a number and convert the time into
 * UNIX format.
 *
 * @param {string} actionTime - The time that is in our action.
 * @param {number} dayNum - A number, 0-6, that represents a day of the week.
 * @return {UNIX time} newDate.getTime() - A date in UNIX format.
 */
const newDay = (actionTime, dayNum) => {
	let date = getNextDayOfWeek(new Date() , dayNum);
	let time = parseTime(actionTime);
	let newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), time[0], time[1], time[2]);
	return newDate.getTime();
}

/**
 * convertUnix() will convert a UNIX timestamp into **:** format.
 *
 * @param {string} unixTime - A UNIX timestamp
 * @return {string} time - A time in format **:**;
 */
const convertUnix = (unixTime) => {
	let date = new Date(unixTime);
	// Hours part from the timestamp
	let hours = date.getHours();
	// Minutes part from the timestamp
	let minutes = "0" + date.getMinutes();
	// Seconds part from the timestamp
	// let seconds = "0" + date.getSeconds();

	// Will display time in 10:30:23 format
	return hours + ':' + minutes.substr(-2);
}


/**
 * gameReducer() handles state changes for all actions that occur.
 *
 * @param {object} state - The state of the application.
 * @param {object} action - An action that occurs.
 * @return {object} state - The state of the application after an action occurs.
 */
const gameReducer = (state, action) => {
	console.log("state: ", state)
	let copyState = state || initialState;
	state = Object.assign({}, copyState);

	if (action.type === actions.FETCH_MEDICATION_REQUEST) {
		state.loading = true;
	} else if (action.type === actions.FETCH_MEDICATION_SUCCESS) {
		let name = null;
		let days = [];
		let time = "00:00";
		let meds = [];
		for (let i = 0; i < action.medications.length; i++) {
			name = action.medications[i].name;
			days = action.medications[i].days.map(day => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][day]);
			time = convertUnix(action.medications[i].firstReminder);
			meds.push([name, days, time])
			days = [];
		}
		state.medications = meds;
	} else if (action.type === actions.FETCH_MEDICATION_ERROR) {
		state.loading = false;
		state.error = action.error;
	} else if (action.type === actions.CLICK_DAY) {
		switch(action.day) {
			case "Sunday":
				state.sunFlag = !state.sunFlag;
				break;
			case "Monday":
				state.monFlag = !state.monFlag;
				break;
			case "Tuesday":
				state.tueFlag = !state.tueFlag;
				break;
			case "Wednesday":
				state.wedFlag = !state.wedFlag;
				break;
			case "Thursday":
				state.thuFlag = !state.thuFlag;
				break;
			case "Friday":
				state.friFlag = !state.friFlag;
				break;
			case "Saturday":
				state.satFlag = !state.satFlag;
				break;
			default:
				return state;
		}
	} else if (action.type === actions.SUBMIT_FORM) {
		let days = [];
		let dayNum = [];
		let dayUnix = [];
		// let date, newDate, time;
		if (!state.sunFlag && !state.monFlag && !state.tueFlag && !state.wedFlag && !state.thuFlag && !state.friFlag && !state.satFlag) {
			alert("Please select at least one day");
		} else {
			if (state.sunFlag) {
				days.push("Sun");
				dayNum.push(0);
				dayUnix.push(newDay(action.time, 0));
				state.sunFlag = false;
			}
			if (state.monFlag) {
				days.push("Mon");
				dayNum.push(1);
				dayUnix.push(newDay(action.time, 1));
				state.monFlag = false;
			}
			if (state.tueFlag) {
				days.push("Tue");
				dayNum.push(2);
				dayUnix.push(newDay(action.time, 2));
				state.tueFlag = false;
			}
			if (state.wedFlag) {
				days.push("Wed");
				dayNum.push(3);
				dayUnix.push(newDay(action.time, 3));
				state.wedFlag = false;
			}
			if (state.thuFlag) {
				days.push("Thu");
				dayNum.push(4);
				dayUnix.push(newDay(action.time, 4));
				state.thuFlag = false;
			}
			if (state.friFlag) {
				days.push("Fri");
				dayNum.push(5);
				dayUnix.push(newDay(action.time, 5));
				state.friFlag = false;
			}
			if (state.satFlag) {
				days.push("Sat");
				dayNum.push(6);
				dayUnix.push(newDay(action.time, 6));
				state.satFlag = false;
			}
			state.medications = state.medications.concat([[action.medication, days, action.time, dayNum, dayUnix]]);
		}
	} else if (action.type === actions.DELETE_BUTTON) {
		state.medications = state.medications.filter(med => med[0] !== action.medication);
	} else if (action.type === actions.LOGIN_SUCCESS) {
		state.username = action.username;
		state.password = action.password;
	} else if (action.type === actions.SIGNUP_SUCCESS) {
		state.signUpSuccess = true;
	} else if (action.type === actions.DELETE_SUCCESS) {

	} else if (action.type === actions.DELETE_ERROR) {

	} else if (action.type === actions.LOGOUT) {
		alert("You are now logged out!");
		window.location.replace('/');
	}

	return state;
};

exports.gameReducer = gameReducer;
