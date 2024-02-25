import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from '@material-ui/core';

const LoaderComponent = ({ position }) => (
	<div
		style={{
			width: '100%',
			height: '100%',
			minHeight: 300,
			position: position,
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
		}}
	>
		<CircularProgress />
	</div>
);

LoaderComponent.propTypes = {
	position: PropTypes.string,
};

LoaderComponent.defaultProp = {
	position: 'absolute',
};

export default LoaderComponent;
