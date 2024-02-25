import React from 'react';

export const InlineStyleFlexbox = ({
	children,
	extraClassNames = '',
	...restStyles
}) => {
	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				...restStyles,
			}}
			className={extraClassNames}
		>
			{children}
		</div>
	);
};

export const InlineStylecDiv = ({ children, onClick, ...restStyles }) => {
	return (
		<div style={{ ...restStyles }} onClick={onClick}>
			{children}
		</div>
	);
};
