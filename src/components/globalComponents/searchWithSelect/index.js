import React from 'react';
import TextField from '@material-ui/core/TextField';
import { FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';
import { Autocomplete } from '@mui/material';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',

		'& .MuiInputBase-input': {
			padding: '5px !important',
		},

		'& .MuiInputLabel-formControl': {
			top: '-4px',
			color: 'gray',
		},
		'& .MuiAutocomplete-root': {
			'& .MuiFormControl-marginNormal': {
				margin: 0,
			},
		},
		'& .MuiInputBase-root': {
			paddingRight: '12px !important',
		},
	},
	popper: {
		maxHeight: '203px',
		'& .MuiAutocomplete-listbox': {
			'& .MuiAutocomplete-option': {
				borderBottom: '1px solid #80808042',
				padding: '0.7rem 1rem',
			},
		},
	},
}));

const SearchWithSelect = ({
	id = 'free-solo-2-demo',
	options = [],
	disableClearable = false,
	label = '',
	onChange = () => void 0,
	defaultValue = {},
	value,
	optionUiText = 'title',
	optionValueKey = 'value',
	error = '',
	helperText = '',
	placeholder = '',
	etraTextFieldProps = {},
	showSearchIcon = true,
	extraPopperClasses = '',
	...extraSelectProps
}) => {
	const classes = useStyles();
	return (
		<FormControl variant={'outlined'} classes={classes} className="extraClass">
			<Autocomplete
				classes={{
					paper: `${classes.popper} ${extraPopperClasses}`,
				}}
				id={id}
				value={value}
				debug
				disableClearable={disableClearable}
				options={options}
				defaultValue={defaultValue}
				getOptionLabel={options => options[optionUiText] || ''}
				onChange={(e, changedValue) => onChange(changedValue)}
				isOptionEqualToValue={(option, value) =>
					option[optionValueKey] === value[optionValueKey]
				}
				{...extraSelectProps}
				renderInput={params => {
					const InputProps = {
						...params.InputProps,
						type: 'search',
					};
					if (showSearchIcon) {
						InputProps.endAdornment = <SearchIcon color="disabled" />;
					}
					return (
						<TextField
							{...params}
							error={error}
							helperText={helperText}
							label={label}
							placeholder={placeholder}
							margin="normal"
							variant="outlined"
							InputProps={InputProps}
							{...etraTextFieldProps}
						/>
					);
				}}
			/>
		</FormControl>
	);
};

SearchWithSelect.propTypes = {
	options: PropTypes.array,
	disableClearable: PropTypes.bool,
	label: PropTypes.string || PropTypes.element,
	defaultValue: PropTypes.object,
	onChange: PropTypes.func,
	optionUiText: PropTypes.string,
	error: PropTypes.bool,
	helperText: PropTypes.string,
	etraTextFieldProps: PropTypes.object,
};

export default SearchWithSelect;
