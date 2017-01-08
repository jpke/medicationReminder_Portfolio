/**
 * @summary login-form.js will render a login component.
 * 
 * @require react, react-redux, ../actions/medication, ./nav.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../actions/medication';
import Nav from './nav';

/**
 * createHandlers() will handle all the events that can occur on this component. There is one
 * event handler called logInSubmit, which handles the click on the submit button.
 *
 * @params {function} dispatch - dispatches a payload to all registered callbacks
 * @return {object} handlers - the event handlers specified in this function.
 */
let createHandlers = (dispatch) => {
	/**
	 * logInSubmit() will handle the submit button event on login form.
	 *
	 * @params {event} event - the submit event.
	 */
	let logInSubmit = (event) => {
		event.preventDefault();
		dispatch(actions.login(event.target.username.value, event.target.password.value));
	}
		return {
		logInSubmit
	}
}

/**
 * Login is a React Component that renders a login form.
 */
class Login extends Component {
	constructor(props) {
	    super(props);
	    this.handlers = createHandlers(this.props.dispatch);
	}
	render() {
		return (
			<div>
				<Nav />
				<h1>Medication Reminder</h1>
				<form id="loginForm" onSubmit={this.handlers.logInSubmit}>
				    <div id="border-form" className="form-group">
				    <h1>LOGIN</h1>
				        <input type="text" name="username" id="username" className="form-control input-sm" placeholder="Username" autoComplete="off" required/>
				        <input type="password" name="password" className="form-control input-sm" placeholder="Password" required/>
				        <input type="submit" value="Login" className="btn btn-info btn-block"/>
				        <p>No account? Click <a href="#/signup">here</a> to register!</p>
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
		//needed to use dispatch in createHandlers
	};
};

let Container = connect(mapStateToProps)(Login);
export default Container;