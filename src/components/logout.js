/**
 * @summary logout.js will a button that serves as a logout button.
 * 
 * @require react, react-redux, ../actions/medication.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../actions/medication';

/**
 * createHandlers() will handle all the events that can occur on this component.
 *
 * @params {function} dispatch - dispatches a payload to all registered callbacks
 * @return {object} handlers - the event handlers specified in this function.
 */
let createHandlers = (dispatch) => {
	/**
	 * logoutClick() will handle the click event on the logout button by dispatching
	 * the logout action.
	 * 
	 * @params {object} event - the event that occurred.
	 */
	let logoutClick = (event) => {
		event.preventDefault();
		dispatch(actions.logout());
	}
	return {
		logoutClick
	}
}

/**
 * LogOut is a React Component that renders a button.
 */
class Logout extends Component {
	constructor(props) {
	    super(props);
	    this.handlers = createHandlers(this.props.dispatch);
	}
	render() {
		return (
			 <button type="button" className="logout" onClick={this.handlers.logoutClick}>Log out</button>
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

let Container = connect(mapStateToProps)(Logout);
export default Container;