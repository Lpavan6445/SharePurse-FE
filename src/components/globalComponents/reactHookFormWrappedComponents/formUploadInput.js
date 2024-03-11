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
	allowedTypes = [],
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
							const value = e.target.value;
							const files = e.target.files;
							if (allowedTypes.length) {
								if (!allowedTypes.includes(files?.[0]?.type)) {
									alert('Please select a valid JPG or PNG image.');
									setValue('');
									field.onChange('')
									return 
								} 
							} 
							setValue(value);
							field.onChange(files);
							
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