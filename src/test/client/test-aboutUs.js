import React from 'react';
import chai from 'chai';
chai.should();
import TestUtils from 'react-addons-test-utils';
import AboutUs from '../../client/js/components/about-us';

describe('About us component', function() {
	var renderer, result;
	beforeEach(function() {
		renderer = TestUtils.createRenderer();
		renderer.render(<AboutUs about='about us' content='is content' />);
		result = renderer.getRenderOutput();
	});

	it('Renders about us section', function() {
		console.log("made it inside", result.props.children.props);
		result.props.children.type.should.equal('div');
		result.props.children.props.className.should.equal('content');
		result.props.children.props.should.be.an('object');
	});
});