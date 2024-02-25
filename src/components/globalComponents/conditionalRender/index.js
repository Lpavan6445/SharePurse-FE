import React from 'react';
import PropTypes, { element } from 'prop-types';

// Conditionally Render a component if condition is true it will return children otherwise it will return elseShowThis condition or null.
function ConditionalRender({ shouldRender, children, elseShowThis }) {
	if (shouldRender) {
		return children instanceof Function ? children() : children;
	}

	return elseShowThis || null;
}

ConditionalRender.propTypes = {
	shouldRender: PropTypes.bool,
	elseShowThis: PropTypes.any,
	children:
		PropTypes.element ||
		PropTypes.string ||
		PropTypes.array ||
		PropTypes.func ||
		PropTypes.arrayOf(element),
};

export default ConditionalRender;