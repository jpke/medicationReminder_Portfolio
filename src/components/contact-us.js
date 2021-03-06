/**
 * @summary contact-us.js will render a div.
 *
 * @require react, react-redux, ../actions/medication.
 */
import React, {Component} from 'react';
import Nav from './nav';
/**
 * ContactUs is a React Component that renders a div with information on how to contact the creators of this application.
 */
class ContactUs extends Component {
	// constructor(props) {
	//     super(props);
	// }
	render() {
		return (
			<div>
				<Nav />
			    <div className="form-group contact">
			      <p>If you have any questions, contact us <a href="mailto:jp@jpearnest.com" title="email us">here</a></p>
			    </div>
		    </div>
		);
	}
}

export default ContactUs;
