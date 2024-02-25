import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { Autocomplete } from '@mui/material';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',

		// '& .MuiInputBase-input': {
		// 	padding: '5px !important',
		// },

		// '& .MuiInputLabel-formControl': {
		// 	top: '-4px',
		// 	color: 'gray',
		// },
		'& .MuiAutocomplete-root': {
			'& .MuiFormControl-marginNormal': {
				margin: 0,
			},
		},
		'& .MuiAutocomplete-inputRoot': {
			paddingRight: '10px !important',
		},
	},
	popper: {
		// '& .MuiAutocomplete-listbox': {
		// 	'& .MuiAutocomplete-option': {
		// 		borderBottom: '1px solid #80808042',
		// 		padding: '0.7rem 1rem',
		// 	},
		// },
	},
}));

const GroupedSearchWithSelect = ({
	id = 'multiple-limit-tags',
	limitTags = 3,
	size = 'small',
	options = [],
	disableClearable = false,
	label = '',
	onChange,
	defaultValue = {},
	value = [],
	optionUiText = 'title',
	optionValueKey = 'value',
	searchGroupByOptions = {},
	placeholder = '',
	multiple = true,
	groupName = 'groupName',
	showSearchIcon = true,
	...etraTextFieldProps
}) => {
	const classes = useStyles();

	return (
		<FormControl variant={'outlined'} classes={classes} className="extraClass">
			<Autocomplete
				id={id}
				limitTags={limitTags}
				size={size}
				classes={{
					paper: classes.popper,
				}}
				freeSolo
				value={value}
				options={options}
				multiple={multiple}
				defaultValue={defaultValue}
				// render options
				getOptionLabel={options => options[optionUiText] || ''}
				renderOption={option => option.customRender || option[optionUiText]}
				onChange={(e, changedValue) => onChange(changedValue)}
				groupBy={option =>
					searchGroupByOptions[option[groupName]]?.uiTxt || option[groupName]
				}
				clearOnBlur
				isOptionEqualToValue={(option, value) =>
					option[optionValueKey] === value[optionValueKey]
				}
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
							label={label}
							margin="normal"
							variant="outlined"
							placeholder={placeholder}
							InputProps={InputProps}
							{...etraTextFieldProps}
						/>
					);
				}}
			/>
		</FormControl>
	);
};

GroupedSearchWithSelect.propTypes = {
	options: PropTypes.array,
	disableClearable: PropTypes.bool,
	label: PropTypes.string || PropTypes.element,
	defaultValue: PropTypes.object,
	searchGroupByOptions: PropTypes.object,
};

export default GroupedSearchWithSelect;
