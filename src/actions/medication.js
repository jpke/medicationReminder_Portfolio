/**
 * @summary medication.js holds all the actions that occur in the application. Actions are
 * payloads of information that send data from the application to the store and are
 * the only source of information for the store.
 *
 */

// toggle between production and development server urls
 // var rootUrl = 'https://portfolio-express.herokuapp.com/med/';
 const rootUrl = 'http://localhost:8080/med/'

import fetch from 'isomorphic-fetch';
// import store from '../store';

/**
 * clickDay() handles the user clicks on a day button in med-form.
 *
 * @param {string} day - The name of the day
 */
const CLICK_DAY = "CLICK_DAY";
const clickDay = (day) => {
	return {
		type: CLICK_DAY,
		day: day
	};
};

/**
 * submitForm() handles the user submit on the med-form.
 *
 * @param {string} med - The name of the medicine.
 * @param {string} time - The time filled out in the form.
 * @return {object} action - The action and its properties.
 */
const SUBMIT_FORM = "SUBMIT_FORM";
const submitForm = (med, time) => {
	return {
		type: SUBMIT_FORM,
		medication: med,
		time: time
	}
}

/**
 * deleteButton() handles the user clicks on the delete button.
 *
 * @param {string} med - The name of the medicine.
 * @return {object} action - The action and its properties.
 */
const DELETE_BUTTON = "DELETE_BUTTON";
const deleteButton = (med) => {
	return {
		type: DELETE_BUTTON,
		medication: med
	}
}

/**
 * fetchMedicationRequest()
 *
 * @return {object} action - The action and its properties.
 */
const FETCH_MEDICATION_REQUEST = "FETCH_MEDICATION_REQUEST";
const fetchMedicationRequest = () => {
	return {
		type: FETCH_MEDICATION_REQUEST
	};
};

/**
 * fetchMedicationSuccess() handles if fetchMediation succeeded
 *
 * @param {array} medications - An array of medications [name, days, time].
 * @return {object} action - The action and its properties.
 */
const FETCH_MEDICATION_SUCCESS = "FETCH_MEDICATION_SUCCESS";
const fetchMedicationSuccess = (medications) => {
	return {
		type: FETCH_MEDICATION_SUCCESS,
		medications: medications
	};
};

/**
 * fetchMedicationError() handles if fetchMediation fails
 *
 * @param {string} error - An error that occurred.
 * @return {object} action - The action and its properties.
 */
const FETCH_MEDICATION_ERROR = "FETCH_MEDICATION_ERROR";
const fetchMedicationError = (error) => {
	return {
		type: FETCH_MEDICATION_ERROR,
		error: error
	};
};

const DEMO_MODE = "DEMO_MODE";
const demoMode = () => {
	return {
		type: DEMO_MODE
	};
};

/**
 * loginSuccess() handles if login succeeded
 *
 * @param {string} username - A username.
 * @param {string} password - A password.
 * @return {object} action - The action and its properties.
 */
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const loginSuccess = (username, password) => {
	return {
		type: LOGIN_SUCCESS,
		username: username,
		password: password
	};
};

/**
 * loginError() handles if login fails
 *
 * @param {string} error - An error that occurred.
 * @return {object} action - The action and its properties.
 */
const LOGIN_ERROR = "LOGIN_ERROR";
const loginError = (error) => {
	return {
		type: LOGIN_ERROR,
		error: error
	};
};

/**
 * deleteSuccess() handles if delete succeeded
 *
 * @return {object} action - The action and its properties.
 */
const DELETE_SUCCESS = "DELETE_SUCCESS";
const deleteSuccess = () => {
	return {
		type: DELETE_SUCCESS
	};
};

/**
 * deleteError() handles if deleteMed fails
 *
 * @param {string} error - An error that occurred.
 * @return {object} action - The action and its properties.
 */
const DELETE_ERROR = "DELETE_ERROR";
const deleteError = (error) => {
	return {
		type: DELETE_ERROR,
		error: error
	};
};

/**
 * signUpSuccess() handles if sigbnup succeeded
 *
 * @param {string} username - A username.
 * @return {object} action - The action and its properties.
 */
const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
const signupSuccess = (username) => {
	return {
		type: SIGNUP_SUCCESS,
		username: username
	};
};

/**
 * signupError() handles if signup fails
 *
 * @param {string} error - An error that occurred.
 * @return {object} action - The action and its properties.
 */
const SIGNUP_ERROR = "SIGNUP_ERROR";
const signupError = (error) => {
	return {
		type: SIGNUP_ERROR,
		error: error
	};
};

/**
 * logout() handles if logout button click
 *
 * @return {object} action - The action and its properties.
 */
const LOGOUT = "LOGOUT";
const logout = () => {
	return {
		type: LOGOUT
	}
}

/**
 * fetchMedications() fetches the medications of a user.
 *
 * @return {object} action - The action and its properties.
 */
const fetchMedications = (username, password) => {
	return (dispatch) => {
		const url = rootUrl + 'medication';
		dispatch(fetchMedicationRequest());
		let enUserPass = btoa(username + ":" + password);
		return fetch(url, {
			method: 'GET',
			headers: {'Accept':'application/json', Authorization: 'Basic ' + enUserPass}
		})
		.then((response) => {
			if (response.status < 200 || response.status >= 300) {
				let error = new Error(response.statusText);
				error.response = response;
				throw error;
			}
			return response.json();
		})
		.then((data) => {
			return dispatch(fetchMedicationSuccess(data));
		})
		.catch((error) => {
			return dispatch(fetchMedicationError(error));
		});
	}
};

/**
 * login() makes a get request to the endpoint /medication
 *
 * @return {object} action - The action and its properties.
 */
const login = (username, password) => {
	return (dispatch) => {
		const url = rootUrl + 'medication';
		http://localhost:8080/
		let enUserPass = btoa(username + ":" + password);
		return fetch(url, {
			method: 'GET',
			headers: {'Accept':'application/json', Authorization: 'Basic ' + enUserPass}
		})
		.then((res) => {
			if (res.status < 200 || res.status >= 300) {
				const error = new Error(res.statusText);
				error.res = res;
				throw error;
			}
			return res.json();
		})
		.then((data) => {
			window.location.replace('#/profile');
			dispatch(fetchMedications(username, password));
			return dispatch(loginSuccess(username, password));
		})
		.catch((error) => {
			alert(error + "!!");
			return dispatch(loginError(error)); // TODO: SET_NOTIFICATION type,
		});
	}
}

/**
 * signup() makes a POST request to the endpoint /signup
 *
 * @return {object} action - The action and its properties.
 */
const signup = (username, email, password) => {
	return (dispatch) => {
		const url = rootUrl + 'user';
		const req = {username, email, password};
		return fetch(url, {
			method: 'POST',
			body: JSON.stringify(req),
			headers: {'content-type': 'application/json', 'Accept':'application/json'}
		})
		.then((res) => {
			if (res.status < 200 || res.status >= 300) {
				const error = new Error(res.statusText);
				error.res = res;
				throw error;
			}
			return res.json();
		})
		.then((data) => {
			alert("Signup successful!!");
			window.location.replace('#/login');
			return dispatch(signupSuccess(data));
		})
		.catch((error) => {
			return dispatch(signupError());
		});
	}
}

/**
 * submitMed() makes a POST request to the endpoint /medication
 *
 * @return {object} action - The action and its properties.
 */
const submitMed = (name, time) => {
	return (dispatch, getState) => {
		let medArray = getState().medications;
		let postArray = medArray[medArray.length -1];
		const url = rootUrl + 'medication';
		const req = {
			name: name,
			days: postArray[3],
			firstReminder: postArray[4][0],
			taken: false,
			username: getState().username,
			password: getState().password
		};
		let enUserPass = btoa(req.username + ":" + req.password);
		return fetch(url, {
			method: 'POST',
			body: JSON.stringify(req),
			headers: {Authorization: 'Basic ' + enUserPass, 'content-type': 'application/json', 'Accept':'application/json'}
		})
		.then((res) => {
			if (res.status < 200 || res.status >= 300) {
				const error = new Error(res.statusText);
				error.res = res;
				throw error;
			}
			return res.json();
		})
		.then((data) => {
			return dispatch(signupSuccess(data));
		})
		.catch((error) => {
			return dispatch(signupError());
		});
	}
}

/**
 * login() makes a DELETE request to the endpoint /medication
 *
 * @return {object} action - The action and its properties.
 */
const deleteMed = (medication) => {
	return (dispatch, getState) => {
		const url = rootUrl + 'medication';
		const req = {
			name: medication,
			username: getState().username,
			password: getState().password
		};
		let enUserPass = btoa(req.username + ":" + req.password);
		return fetch(url, {
			method: 'DELETE',
			body: JSON.stringify(req),
			headers: {Authorization: 'Basic ' + enUserPass, 'content-type': 'application/json', 'Accept':'application/json'}
		})
		.then((res) => {
			return dispatch(deleteSuccess());
		})
		.catch((error) => {
			return dispatch(deleteError());
		});
	}
}

exports.CLICK_DAY = CLICK_DAY
exports.clickDay = clickDay

exports.SUBMIT_FORM = SUBMIT_FORM
exports.submitForm = submitForm

exports.DELETE_BUTTON = DELETE_BUTTON
exports.deleteButton = deleteButton

exports.FETCH_MEDICATION_REQUEST = FETCH_MEDICATION_REQUEST
exports.fetchMedicationRequest = fetchMedicationRequest

exports.FETCH_MEDICATION_SUCCESS = FETCH_MEDICATION_SUCCESS
exports.fetchMedicationSuccess = fetchMedicationSuccess

exports.FETCH_MEDICATION_ERROR = FETCH_MEDICATION_ERROR
exports.fetchMedicationError = fetchMedicationError

exports.DEMO_MODE = DEMO_MODE
exports.demoMode = demoMode

exports.LOGIN_SUCCESS = LOGIN_SUCCESS;
exports.loginSuccess = loginSuccess

exports.LOGIN_ERROR = LOGIN_ERROR;
exports.loginError = loginError

exports.SIGNUP_SUCCESS = SIGNUP_SUCCESS;
exports.signupSuccess = signupSuccess

exports.SIGNUP_ERROR = SIGNUP_ERROR;
exports.signupError = signupError

exports.LOGOUT = LOGOUT;
exports.logout = logout

exports.fetchMedications = fetchMedications
exports.login = login
exports.signup = signup
exports.submitMed = submitMed
exports.deleteMed = deleteMed
