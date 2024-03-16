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
const ReactHookFormInput = ({
	name = '',
	rules = {},
	errors = {},
	control,
	afterChangeFun = () => {},
	...otherProps
}) => {
	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			defaultvalue=""
			render={({ field }) => (
				<TextField
					{...field}
					onChange={e => {
						field.onChange(e);
						afterChangeFun(e);
					}}
					error={!!errors[name]}
					helperText={errors[name] ? errors[name].message : ''}
					size="medium"
					{...otherProps}
					color="text.primary"
				/>
			)}
		/>
	);
};

export default ReactHookFormInput;
