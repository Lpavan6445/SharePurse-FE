import React from 'react';

export const InlineStyleFlexbox = ({
	children,
	onClick = () => {},
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
			onClick={onClick}
		>
			{children}
		</div>
	);
};

export const InlineStylecDiv = ({ children, onClick = () => {}, ...restStyles }) => {
	return (
		<div style={{ ...restStyles }} onClick={onClick}>
			{children}
		</div>
	);
};

export const ImgInlineStyle = ({ 
	altIcon="icon", 
	src="", 
	onClick = () => {},
	...extraStyles
}) => {
	return (
		<img 
			alt={altIcon} 
			src={src} 
			style={{ width: 40, height:40, ...extraStyles }} 
			onClick={onClick}
		/>
	);
};
