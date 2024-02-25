
export const USER_NAME_KEY = "username";
export const EMAIL_KEY = "email";
export const PASS_WORD_KEY = "password";
export const FIRSR_NAME = 'first_name';
export const LAST_NAME = 'last_name';

export const SIGN_UP_FROM_DETAILS = {
    [USER_NAME_KEY]: {
        name: USER_NAME_KEY,
        labelText: 'User Name',
        placeholder: 'Enter your username',
        autocomplete: 'username',
    },
    [FIRSR_NAME]: {
        name: FIRSR_NAME,
        labelText: 'First Name',
        placeholder: 'Enter your firstname',
        autocomplete: 'firstname',
    },
    [LAST_NAME]: {
        name: LAST_NAME,
        labelText: 'Last Name',
        placeholder: 'Enter your lastname',
        autocomplete: 'lastname',
    },
    [EMAIL_KEY]: {
        name: EMAIL_KEY,
        labelText: 'Email',
        placeholder: 'Enter your email address',
        autocomplete: 'email',
    },
    [PASS_WORD_KEY]: {
        name: PASS_WORD_KEY,
        labelText: 'Password',
        placeholder: 'Enter your password',
        autocomplete: 'password',
    }
};