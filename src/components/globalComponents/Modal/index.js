import React from 'react';
import { Backdrop, Modal, Paper, makeStyles } from '@material-ui/core';
import ConditionalRender from '../conditionalRender';
import CloseIcon from '@material-ui/icons/Close';

const styles = makeStyles(theme => ({
	modal: {
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		'& .MuiPaper-root': {
			overflow: 'scroll',
		},
	},
	title: {
		fontSize: '1.1rem',
		fontWeight: '500',
		textAlign: 'center',
		borderBottom: '1px solid #8080808c',
		padding: '0.7rem 1rem',
		position: 'sticky',
		top: 0,
		background: 'white',
		zIndex: '10',
		'& .closeIcon': {
			position: 'absolute',
			top: '5px',
			right: '6px',
			cursor: 'pointer',
		},
	},
}));

const CenteredModal = ({
	isOpen,
	onClose = () => null,
	extraClasses = {},
	extraProps = {},
	children,
	title = '',
	showTitle = true,
	width = 400,
	height = 400,
	minHeight = 500,
	...extraPaperStyles
}) => {
	const classes = styles();
	return (
		<Modal
			className={`${classes.modal} ${extraClasses}`}
			open={!!isOpen}
			onClose={_ => onClose(false)}
			closeIcon="close"
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}
			{...extraProps}
		>
			<Paper
				style={{
					width: width,
					height: height,
					minHeight: minHeight,
					position: 'relative',
					...extraPaperStyles,
				}}
			>
				<ConditionalRender shouldRender={!!showTitle}>
					<div className={classes.title}>
						{title}
						<CloseIcon className="closeIcon" onClick={_ => onClose(false)} />
					</div>
				</ConditionalRender>
				{/* For Children you have to specify width and height  */}
				{children}
			</Paper>
		</Modal>
	);
};

export default CenteredModal;
