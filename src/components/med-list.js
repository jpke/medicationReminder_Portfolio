/**
 * @summary med-list.js will render an unordered list of all the medicine that is in the props.
 * First, map the state to the props to receive the list of medication and then map through
 * this.props.meds and create a Medicine component for each med in this.props.meds.
 *
 * @require react, react-redux, ./medicine.
 */
import React, {Component}from 'react';
import {connect} from 'react-redux';
import Medicine from './medicine';
// import actions from '../actions/medication';

/**
 * changeToAMPM() will convert the military time input into **:** AM/PM format.
 *
 * @params {string} time - Time in military format.
 * @params {string} timeValue - Time in **:** AM/PM format.
 */
const changeToAMPM = (time) => {
	time = time.split(':'); // convert to array

	// fetch
	var hours = Number(time[0]);
	var minutes = Number(time[1]);

	// calculate
	var timeValue = "" + ((hours >12) ? hours - 12 : hours);  // get hours
	timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
	timeValue += (hours >= 12) ? " P.M." : " A.M.";  // get AM/PM
	return timeValue;
}

/**
 * MedList is a React Component that renders an unordered list of Medicine components based on
 * the number of medicines in this.props.med (which is mapped from state.medications).
 */
class MedList extends Component {
	// constructor(props) {
	//     super(props);
	// }
	render() {
		let array = this.props.meds.map((med, index) => {
			let time = changeToAMPM(med[2]);
			return (<Medicine key={index} medicine={med[0]} days={med[1]} time={time} />);
		});
		return <div>
				 <table>
				 	<thead>
				 		<tr>
				 			<th>Name</th>
				 			<th>Days</th>
				 			<th>Time</th>
				 			<th></th>
				 		</tr>
				 	</thead>
				 	<tbody>
				 		{array}
				 	</tbody>
				 </table>
			   </div>
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
		meds: state.medications,
		sunFlag: state.sunFlag,
		monFlag: state.monFlag,
		tueFlag: state.tueFlag,
		wedFlag: state.wedFlag,
		thuFlag: state.thuFlag,
		friFlag: state.friFlag,
		satFlag: state.satFlag,
		username: state.username,
		password: state.password,
		demoMode: state.demoMode
	};
};

let Container = connect(mapStateToProps)(MedList);
export default Container;
