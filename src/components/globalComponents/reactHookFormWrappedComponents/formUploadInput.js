import React from 'react';
import { Input, TextField } from '@material-ui/core';
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
const ReactHookFormUploadFiles = ({
	name = '',
	rules = {},
	errors = {},
	control,
	// setValue,
	...otherProps
}) => {
	const [value, setValue] = React.useState("");

	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			defaultValue={[]}
			render={({ field }) => {
				return (
					<Input
						type="file"
						{...field}
						value={value}
						onChange={(e) => {
							setValue(e.target.value);
							field.onChange(e.target.files);
						}}
						error={!!errors[name]}
						helperText={errors[name] ? errors[name].message : ''}
						size="medium"
						{...otherProps}
					/>
				)
			}}
		/>
	);
};

export default ReactHookFormUploadFiles;
