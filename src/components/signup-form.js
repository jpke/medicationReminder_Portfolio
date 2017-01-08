/**
 * @summary signup-form.js will render a signup component.
 * 
 * @require react, react-redux, ../actions/medication, ./nav.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../actions/medication';
import Nav from './nav';

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
	}
	/**
	 * signupSubmit() will handle the submit on sign up which will dispatch an action called
	 * signup that sends the username, email, and password.
	 * 
	 * @params {object} event - the event that occurred.
	 */
	let signupSubmit = (event) => {
		event.preventDefault();
		dispatch(actions.signup(event.target.username.value, event.target.email.value, event.target.password.value));
		event.target.reset();
	}
	return {
		delClick,
		signupSubmit
	}
}

/**
 * SignUp is a React Component that renders a form that is used signing up a member..
 */
class SignUp extends Component {
	constructor(props) {
	    super(props);
	    this.handlers = createHandlers(this.props.dispatch);
	}
	render() {
		return (
			<div>
				<Nav />
			 	<form id="signupForm" onSubmit={this.handlers.signupSubmit}>
			      <div id="border-signup">
			      <h1>SIGN UP</h1>
			        <input type="text" name="username" className="form-control input-sm" placeholder="Username" autoComplete="off" required/>
			        <input type="text" name="email" className="form-control input-sm" placeholder="Email Address" autoComplete="off" required/>
			        <input type="password" name="password" className="form-control input-sm" placeholder="Password" autoComplete="off" required/>
			        <input type="submit" value="Sign Up" className="btn btn-info btn-block"/>
			        <p>Already have an account? Click <a href="#/login">here</a> to login!</p>
			      </div>
			    </form>
		    </div>
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
		signUpSuccess: state.signUpSuccess
	};
};

let Container = connect(mapStateToProps)(SignUp);
export default Container;