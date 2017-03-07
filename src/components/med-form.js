/**
 * @summary med-form.js is a React Component that renders a form. This form allows a user to
 * input the name of the medication, the days of the week, and the time that the medication should
 * be taken. This component uses the state to handle whether or not certain day buttons are
 * highlighted or not (based on the flag and click).
 *
 * @require react, react-redux, ../actions/medication
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../actions/medActions';

/**
 * createHandlers() will handle all the events that can occur on this component. There are two
 * events that are handled: dayClick and formSubmit.
 *
 * @params {function} dispatch - dispatches a payload to all registered callbacks
 * @params {object} props - the properties of the component.
 * @return {object} handlers - the event handlers specified in this function.
 */
let createHandlers = (dispatch, props) => {
	/**
	 * dayClick() will handle when any of the day buttons are clicked by dispatching the
	 * clickDay action and passing in evnet.target.name, which is the name of the button.
	 *
	 * @params {object} event - the event that occurred.
	 */
	let dayClick = (event) => {
		event.preventDefault();
		dispatch(actions.clickDay(event.target.name));
	}
	/**
	 * formSubmit() will handle the submitting of the form. It will dispatch the submitForm
	 * action and pass in the name of the medicine and the time that the user specifies.
	 *
	 * @params {object} event - the event that occurred.
	 */
	let formSubmit = (event) => {
		console.log('formSubmit triggered')
		event.preventDefault();
		dispatch(actions.submitForm(event.target.medication.value, event.target.time.value));
		dispatch(actions.submitMed(event.target.medication.value, event.target.time.value));
		event.target.reset();
	}
	return {
		dayClick,
		formSubmit
	}
}

/**
 * MedForm is a React Component that renders a form with two inputs and various buttons for the
 * days of the week. In render(), button classNames are determined based on the state of the
 * days' respective flags: 'highlight' if flag is true, else 'base'.
 */
class MedForm extends Component {
	constructor(props, context) {
	    super(props);
	    this.handlers = createHandlers(this.props.dispatch, this.props);
	}
	componentDidMount() {
		if(this.props.demoMode) {
			alert("You can see the medication reminder selection page and list in demo mode. You will need to register and log in in order to generate an email reminder.")
		}
	}
	componentWillUpdate(nextProps, nextState) {
		if (!nextProps.isLoggedIn) {
			window.location.href = "#";
		}
	}

	render() {
		let monClass = this.props.monFlag ? 'highlight' : 'base';
		let tueClass = this.props.tueFlag ? 'highlight' : 'base';
		let wedClass = this.props.wedFlag ? 'highlight' : 'base';
		let thuClass = this.props.thuFlag ? 'highlight' : 'base';
		let friClass = this.props.friFlag ? 'highlight' : 'base';
		let satClass = this.props.satFlag ? 'highlight' : 'base';
		let sunClass = this.props.sunFlag ? 'highlight' : 'base';
		return <form className="form-group medicine" onSubmit={this.handlers.formSubmit} autoComplete="off">
					<label htmlFor="medication">Name of Medication</label>&nbsp;
					<input type="text" required="required" name="medication"/>&nbsp;
					<label>Days of the Week</label>&nbsp;
					<span>
						<button type="button" className={monClass} onClick={this.handlers.dayClick} name="Monday">Mon</button>
						<button type="button" className={tueClass} onClick={this.handlers.dayClick} name="Tuesday">Tue</button>
						<button type="button" className={wedClass} onClick={this.handlers.dayClick} name="Wednesday">Wed</button>
						<button type="button" className={thuClass} onClick={this.handlers.dayClick} name="Thursday">Thu</button>
						<button type="button" className={friClass} onClick={this.handlers.dayClick} name="Friday">Fri</button>
						<button type="button" className={satClass} onClick={this.handlers.dayClick} name="Saturday">Sat</button>
						<button type="button" className={sunClass} onClick={this.handlers.dayClick} name="Sunday">Sun</button>
					</span>&nbsp;
					<label htmlFor="time">Time</label>&nbsp;
					<input type="time" name="time" required="required"/>&nbsp;
					<input type="submit"/>
			   </form>
	}
}

/**
 * mapStateToProps will map the application state to the props.
 *
 * @params {object} state - the state of the application.
 * @params {object} props - the props of the component.
 * @return {object} mapped - the props of the component mapped to the state of the app;
 */
let mapStateToProps = (state, props) => {
	return {
		sunFlag: state.sunFlag,
		monFlag: state.monFlag,
		tueFlag: state.tueFlag,
		wedFlag: state.wedFlag,
		thuFlag: state.thuFlag,
		friFlag: state.friFlag,
		satFlag: state.satFlag,
		medication: state.medications,
		isLoggedIn: state.username
	};
};

let Container = connect(mapStateToProps)(MedForm);
export default Container;
