/**
 * @summary home.js is the container that holds Login component.
 *
 * @require react,  login-form
 */
import React, {Component} from 'react';
import Login from './login-form'

/**
 * Home is a React Component that renders a Login Component
 */
class Home extends Component {
	// constructor(props) {
	//     super(props);
	// }
	render() {
		return (<div>
					<Login />
				</div>
		)
	}
}

export default Home;
