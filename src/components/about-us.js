/**
 * @summary about-us.js will render a About Us component.
 *
 * @require react, react-redux, ../actions/medication.
 */
import React, {Component} from 'react';
import Nav from './nav'

/**
 * AboutUs is a React Component that renders a div with information about the app and its creators.
 */
class AboutUs extends Component {
  // constructor(props) {
  //     super(props);
  // }
  render() {
    return (
      <div>
        <Nav />
        <div className="form-group about">
          <div className="content">
            <h3>What is this about?</h3>
            <div>
              <p>Let's be honest, there are times when you accidentally forget to take your medication.  I know I have.  This app is designed to make our lives easier by setting a reminder to take all of your medications at any given time.  It also keeps the medication list handy where you can take it to your doctor's appointment and won't have to memorize any names that are difficult to pronouce.  If you fill that you can benefit from this, look no further, just click on Sign Up and let's get started</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AboutUs;
