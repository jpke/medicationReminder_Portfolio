import React from 'react';
import chai from 'chai';
chai.should();
import TestUtils from 'react-addons-test-utils';
import Container from '../../client/js/components/container';

describe('Container component', function() {
	var renderer, result;
	beforeEach(function() {
		renderer = TestUtils.createRenderer();
		renderer.render(<Container />);
		result = renderer.getRenderOutput();
	});

	it('Renders container section', function() {
		console.log("made it inside", result.props.children);
		result.props.should.be.an('object');
	});
});