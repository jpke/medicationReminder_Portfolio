/**
 * @summary login-form.js will render a login component.
 *
 * @require react, react-redux, ../actions/medication, ./nav.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {login, demoMode} from '../actions/medActions';
import Nav from './nav';

/**
 * Login is a React Component that renders a login form.
 */
class Login extends Component {
	/**
	 * logInSubmit() will handle the submit button event on login form.
	 *
	 * @params {event} event - the submit event.
	 */
	 logInSubmit(event) {
		event.preventDefault();
		this.props.login(event.target.username.value, event.target.password.value);
	}

	componentWillReceiveProps(nextProps, nextState) {
		if(!this.props.username && nextProps.username) {
			window.location.href = '#/profile';
		}
	}

	render() {
		return (
			<div>
				<Nav />
				<h1>Medication Reminder</h1>
				<form id="loginForm" onSubmit={this.logInSubmit.bind(this)}>
				    <div id="border-form" className="form-group">
				    <h1>LOGIN</h1>
				        <input type="text" name="username" id="username" className="form-control input-sm" placeholder="Username" autoComplete="off" required/>
				        <input type="password" name="password" className="form-control input-sm" placeholder="Password" required/>
				        <input type="submit" value="Login" className="btn btn-info btn-block"/>
				        <p>No account? Click <a href="#/signup">here</a> to register!</p>
								<p id="orDemo">or</p>
								<div className="demoButtonContainer">
									<div id="demo" className="btn btn-info btn-demo" onClick={() => {this.props.demo()}}>Demo</div>
								</div>
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
 * @return {object} mapped - the props of the component mapped to the state of the app;
 */
function mapStateToProps(state) {
	return {
		username: state.username
	};
};

/**
 * mapDispatchToProps will map the actions to component props.
 *
 * @params {object} dispatch - method to dispatch action to store.
 * @return {object} mapped - actions mapped to component props
 */
function mapDispatchToProps(dispatch) {
	return {
		login: (username, password) => {dispatch(login(username, password))},
		demo: () => {dispatch(demoMode())}
	}
}

let Container = connect(mapStateToProps, mapDispatchToProps)(Login);
export default Container;
