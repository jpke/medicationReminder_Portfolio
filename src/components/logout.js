/**
 * @summary logout.js will a button that serves as a logout button.
 *
 * @require react, react-redux, ../actions/medication.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {logout} from '../actions/medActions';


/**
 * LogOut is a React Component that renders a button.
 */
class Logout extends Component {
	/**
	 * logoutClick() will handle the click event on the logout button by dispatching
	 * the logout action.
	 *
	 * @params {object} event - the event that occurred.
	 */
	logoutClick(event) {
		event.preventDefault();
		this.props.logout();
	}
	render() {
		return (
			<div className="logoutButtonContainer">
				 <button type="button" className="btn btn-info logout" onClick={this.logoutClick.bind(this)}>Log out</button>
			 </div>
		);
	}
}

/**
 * mapDispatchToProps will map the actions to component props.
 *
 * @params {object} dispatch - method to dispatch action to store.
 * @return {object} mapped - actions mapped to component props
 */
function mapDispatchToProps(dispatch) {
	return {
		logout: () => {dispatch(logout())}
	}
}

export default connect(null, mapDispatchToProps)(Logout);
