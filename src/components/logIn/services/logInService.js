import * as yup from "yup";
import { PASS_WORD_KEY, USER_NAME_KEY } from "../constants";

const getLogInValidations = yup.object().shape({
    [USER_NAME_KEY]: yup.string().required("Can't be empty!"),
    [PASS_WORD_KEY]: yup.string().required("Can't be empty!"),
  });

const LogInServices = {
    getLogInValidations,
};

export default LogInServices;