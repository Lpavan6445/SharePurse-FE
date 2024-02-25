import * as yup from "yup";
import { EMAIL_KEY, PASS_WORD_KEY, USER_NAME_KEY } from "../constant";

const getSignUpValidations = yup.object().shape({
    [USER_NAME_KEY]: yup.string().trim().required("Can't be empty!"),
    [EMAIL_KEY]: yup.string().email().trim().required("Can't be empty!"),
    [PASS_WORD_KEY]: yup.string().trim().required("Can't be empty!"),
});

const SignUpServices = {
    getSignUpValidations,
};

export default SignUpServices;