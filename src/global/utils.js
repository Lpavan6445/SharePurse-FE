import { isArray, isString } from 'lodash';

export const formatedError = (
	error,
	defaultErrorMsg = 'Something Went Wrong'
) => {

	if (error?.error) {
		return error.error;
	}

	if (error?.message) {
		return error.message;
	}

	if (error?.detail) {
		return error.detail;
	}

	if (error?.response?.data) {
		if (error?.response?.data.error) {
			return error?.response?.data.error
		}

		return error?.response?.data;
	}

	return defaultErrorMsg;
};

export function numFormatterForMoreThan10K(num, decimalPlaces = 2) {
	if (!num) { return 0; }
  
	if (num > 999 && num < 100000) {
	  return `${(num / 1000).toFixed(decimalPlaces)}K`.replace(/\.00?$/, ''); // convert to K for number from > 1000 < 1 million
	}
  
	if (num >= 100000 && num < 10000000) {
	  return `${(num / 100000).toFixed(decimalPlaces)}L`.replace(/\.00?$/, ''); // convert to M for number from > 1 million
	}
  
	if (num >= 10000000) {
	  return `${(num / 10000000).toFixed(decimalPlaces)}Cr`.replace(/\.00?$/, ''); // convert to M for number from > 1 million
	}
  
	return num.toFixed((decimalPlaces)).replace(/\.00?$/, '');
}
  

export function truncateString(str = '', maxLength = 30) {
	if (!str) return '';
	if (str.length > maxLength) {
	  return str.substring(0, maxLength).concat('...');
	}
  
	return str;
}

export function formatNumberWithCurrency(number = 0, currencySymbol = '₹') {
	if (isNaN(number)) return '';
	return `${currencySymbol}${new Intl.NumberFormat().format(number)}`;
}

export const getBeImgaeFullUrl = (url) => {
	return `${process.env.REACT_APP_API_PREFIX}/${url}`
}