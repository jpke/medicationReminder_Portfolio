import React from 'react';
import chai from 'chai';
chai.should();
import TestUtils from 'react-addons-test-utils';
import Home from '../../client/js/components/home';

describe('Home component', function() {
	var renderer, result;
	beforeEach(function() {
		renderer = TestUtils.createRenderer();
		renderer.render(<Home />);
		result = renderer.getRenderOutput();
	});

	it('Renders home page', function() {
		console.log("made it inside", result);
		result.type.should.equal('div');
	});
});