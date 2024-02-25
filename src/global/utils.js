import { isArray, isString } from 'lodash';

export const formatedError = (
	error,
	defaultErrorMsg = 'Something Went Wrong'
) => {
	if (error?.message) {
		return error.message;
	}

	if (error?.error) {
		return error.error;
	}

	if (error?.detail) {
		return error.detail;
	}

	return defaultErrorMsg;
};