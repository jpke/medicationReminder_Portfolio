/**
 * @summary container.js is the container that holds MedForm and MedList components. It
 * is rendered in index.js.
 *
 * @require react, med-list, med-form
 */
import React, {Component} from 'react';
import MedList from './med-list'
import MedForm from './med-form'
import Logout from './logout'
import Nav from './nav'
/**
 * Container is a React Component that renders a MedForm Component and MedList Component.
 */
class Container extends Component {
	// constructor(props) {
	//     super(props);
	// }
	render() {
		return (<div>
					<Nav />
					<MedForm />
					<MedList />
					<Logout />
				</div>
		)
	}
}

export default Container;
