import React from 'react';
import { TextField } from '@material-ui/core';
import { Controller, useFormContext } from 'react-hook-form';
import SearchWithSelect from '../searchWithSelect/index';
import GroupedSearchWithSelect from '../searchWithSelect/groupedSearchWithSelect';
import PropTypes from 'prop-types';

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
export const SIMPLE_SELECT_KEY = 'simpleSelect';
export const GROUPED_SELECT_KEY = 'groupedSelect';

const ReactHookSearchWithSelect = ({
	name = '',
	rules = {},
	errors = {},
	control,
	afterChangeFun = () => void 0,
	selectType = 'simpleSelect',
	multiple = false,
	...otherProps
}) => {
	const groupedSearchWithSelect = field => {
		return (
			<GroupedSearchWithSelect
				{...field}
				error={!!errors[name]}
				helperText={errors[name] ? errors[name].message : ''}
				onChange={changedValue => {
					field.onChange(changedValue);
					afterChangeFun(changedValue);
				}}
				multiple={multiple}
				{...otherProps}
			/>
		);
	};

	const simpleSearchWithSelect = field => {
		return (
			<SearchWithSelect
				{...field}
				error={!!errors[name]}
				helperText={errors[name] ? errors[name].message : ''}
				onChange={changedValue => {
					field.onChange(changedValue);
					afterChangeFun(changedValue);
				}}
				multiple={multiple}
				{...otherProps}
			/>
		);
	};

	const getSelect = field => {
		switch (selectType) {
			case SIMPLE_SELECT_KEY:
				return simpleSearchWithSelect(field);

			case GROUPED_SELECT_KEY:
				return groupedSearchWithSelect(field);

			default:
				return simpleSearchWithSelect(field);
		}
	};

	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({ field }) => getSelect(field)}
		/>
	);
};

ReactHookSearchWithSelect.propTypes = {
	name: PropTypes.string.isRequired,
	rules: PropTypes.object.isRequired,
	control: PropTypes.object.isRequired,
	errors: PropTypes.object,
	afterChangeFun: PropTypes.func,
	selectType: PropTypes.string,
	multiple: PropTypes.bool,
};

export default ReactHookSearchWithSelect;
