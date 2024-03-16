
export const USER_NAME_KEY = "username";
export const EMAIL_KEY = "email";
export const PASS_WORD_KEY = "password";
export const FIRSR_NAME = 'first_name';
export const LAST_NAME = 'last_name';
export const PROFILE_IMAGE = 'image';

export const SIGN_UP_FROM_DETAILS = {
    [USER_NAME_KEY]: {
        name: USER_NAME_KEY,
        labelText: 'User Name',
        placeholder: 'Enter your username',
        autocomplete: 'username',
        validations: {
            required: {
				message: 'Required',
				value: true,
			},
        }
    },
    [FIRSR_NAME]: {
        name: FIRSR_NAME,
        labelText: 'First Name',
        placeholder: 'Enter your firstname',
        autocomplete: 'firstname',
        validations: {
            required: {
				message: 'Required',
				value: true,
			},
        }
    },
    [LAST_NAME]: {
        name: LAST_NAME,
        labelText: 'Last Name',
        placeholder: 'Enter your lastname',
        autocomplete: 'lastname',
        validations: {
            required: {
				message: 'Required',
				value: true,
			},
        }
    },
    [EMAIL_KEY]: {
        name: EMAIL_KEY,
        labelText: 'Email',
        placeholder: 'Enter your email address',
        autocomplete: 'email',
        validations: {
            required: {
				message: 'Required',
				value: true,
			},
        }
    },
    [PASS_WORD_KEY]: {
        name: PASS_WORD_KEY,
        labelText: 'Password',
        placeholder: 'Enter your password',
        autocomplete: 'password',
        validations: {
            required: {
				message: 'Required',
				value: true,
			},
        }
    },
    [PROFILE_IMAGE]: {
        name: PROFILE_IMAGE,
        labelText: "* Image",
        placeholder: "Select a Image",
        autocomplete: "profileImage",
        validations: {
            required: {
				message: 'Required',
				value: true,
			},
        }
    }
};