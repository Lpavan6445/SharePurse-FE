import React from 'react';
import { TextField, makeStyles } from '@material-ui/core';
import { Controller, useFormContext } from 'react-hook-form';
/* 
  rules: { 
    required: {
      message: 'fill', value: true
    }, 
    maxLength: {
      message: 'reachedMax 10', value: 10
    }
  }
*/
const styles = makeStyles((theme) => ({
	inputStyles: {
		'& .MuiOutlinedInput-input': {
			padding: '0.7rem'
		}
	}
}))
const ReactHookFormInput = ({
	name = '',
	rules = {},
	errors = {},
	control,
	...otherProps
}) => {
	const classes = styles();
	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			defaultvalue=""
			render={({ field }) => (
				<TextField
					{...field}
					error={!!errors[name]}
					helperText={errors[name] ? errors[name].message : ''}
					size="medium"
					className={classes.inputStyles}
					{...otherProps}
				/>
			)}
		/>
	);
};

export default ReactHookFormInput;
