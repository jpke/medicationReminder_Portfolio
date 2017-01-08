import React from 'react';
import chai from 'chai';
chai.should();
import TestUtils from 'react-addons-test-utils';
import Login from '../../client/js/components/login-form';
import reducers from '../../client/js/reducer/medication';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import store from '../../client/js/store';

describe('Login Form component', function() {
	var renderer, result, state;
	beforeEach(function() {

		state = {
			username: "mario",
			password: "luigi"
		};

	renderer = TestUtils.createRenderer();
	renderer.render(<Provider store= {store}><Login state={state}/></Provider>);
	result = renderer.getRenderOutput();
	});

	it('Renders login form', function() {
		console.log("made it inside", result);
	});
});