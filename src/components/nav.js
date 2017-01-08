/**
 * @summary nav.js will render a navigation component.
 *
 * @require react, react-redux, ../actions/medication.
 */
import React, {Component} from 'react';

/**
 * AboutUs is a React Component that renders a div with information about the app and its creators.
 */
class AboutUs extends Component {
  // constructor(props) {
  //     super(props);
  // }
  render() {
    return (
      <div className="main-header">
        <ul className="nav nav-pills">
          <li role="presentation"><a href="#" id="logo">Home</a></li>
          <li role="presentation"><a href="#profile">Profile</a></li>
          <li role="presentation"><a href="#aboutUs">About Us</a></li>
          <li role="presentation"><a href="#contactUs">Contact Us</a></li>
        </ul>
      </div>
    );
  }
}

export default AboutUs;
