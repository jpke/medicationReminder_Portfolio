/**
 * @summary medicine.js will render a list item with the name of the medicine, the days of
 * the week needed, the time, and a delete button.
 *
 * @require react, react-redux, ../actions/medication.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../actions/medActions';

/**
 * createHandlers() will handle all the events that can occur on this component. There is one
 * event handler called delClick, which handles the click on the delete button.
 *
 * @params {function} dispatch - dispatches a payload to all registered callbacks
 * @return {object} handlers - the event handlers specified in this function.
 */
let createHandlers = (dispatch) => {
	/**
	 * delClick() will handle the clicking of the delete button. This will dispatch the
	 * deleteButton actions which takes in the name of the medicine (event.target.name).
	 *
	 * @params {object} event - the event that occurred.
	 */
	let delClick = (event) => {
		event.preventDefault();
		dispatch(actions.deleteButton(event.target.name));
		dispatch(actions.deleteMed(event.target.name));
	}
	return {
		delClick
	}
}

/**
 * Medicine is a React Component that renders a table row containing the medicine name,
 * days, time and a delete button.
 */
class Medicine extends Component {
	constructor(props) {
	    super(props);
	    this.handlers = createHandlers(this.props.dispatch);
	}
	render() {
		let days = this.props.days.map((day, index) => {
			return (<button key={index} type="button" disabled>{day}</button>);
		});
		return (
			 <tr>
			    <td>{this.props.medicine}</td>
			    <td>{days}</td>
			    <td>{this.props.time}</td>
			    <td><button name={this.props.medicine} className="delete" onClick={this.handlers.delClick}>Delete</button></td>
			</tr>
		);
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
		//need to map here so that dispatch() works...
		//otherwise, "dispatch() is not a function" occurs
	};
};

let Container = connect(mapStateToProps)(Medicine);
export default Container;
