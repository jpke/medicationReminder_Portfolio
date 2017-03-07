/**
 * @summary index.js is the main file that will render a Board to the virtual DOM.
 *
 * @require react, react-dom, react-redux, ./store, ./components/med-container
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import {Router, Route, hashHistory} from 'react-router';
import Container from './components/container';
import Home from './components/home';
import SignUp from './components/signup-form';
import ContactUs from './components/contact-us';
import LogIn from './components/login-form';
import AboutUs from './components/about-us';
import './index.css'
import requireAuth from './requireAuth';

const routes = (
	<Provider store={store}>
		<Router history={hashHistory}>
			<Route path="/" component={Home}/>
			<Route path="/profile" component={requireAuth(Container)} />
			<Route path="/login" component={LogIn} />
			<Route path="/signup" component={SignUp} />
			<Route path="/aboutUs" component={AboutUs} />
			<Route path="/contactUs" component={ContactUs} />
		</Router>
	</Provider>
);

// document.addEventListener('DOMContentLoaded', () => {
// 	ReactDOM.render(routes, document.getElementById('root'));
// });

ReactDOM.render(
  routes,
  document.getElementById('root')
);
