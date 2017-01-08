import React from 'react';
import chai from 'chai';
chai.should();
import TestUtils from 'react-addons-test-utils';
import ContactUs from '../../client/js/components/contact-us';

describe('Contact us component', function() {
	var renderer, result;
	beforeEach(function() {
		renderer = TestUtils.createRenderer();
		renderer.render(<ContactUs />);
		result = renderer.getRenderOutput();
	});

	it('Renders contact us section', function() {
		console.log("made it inside", result.props.children);
		result.props.className.should.equal('form-group contact');
		result.props.children.type.should.equal('p');
		result.props.children.props.children.should.equal('If you have any questions, please contact us at medi_reminder@example.com');
	});
});
