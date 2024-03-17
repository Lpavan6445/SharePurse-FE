import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AppUrls from "../../Base/route/appUrls.js";
import { useForm } from "react-hook-form";

import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { logInStyles } from "./styles.js";
import ReactHookFormInput from "../globalComponents/reactHookFormWrappedComponents/formInput.js";
import { toast } from "react-toastify";
import axiosInstance from "../../Base/api/axios.js";
import ApiUrls from "../../Base/api/apiUrls.js";
import {
  PASS_WORD_KEY,
  LOGIN_FROM_DETAILS,
  USER_NAME_KEY,
} from "./constants.js";
import LogInServices from "./services/logInService.js";
import cookies from "../../Base/cookie/cookie.js";
import { AUTH_COOKIE_KEY } from "../../Base/cookie/cookieConstants.js";
import ButtonComponent from "../globalComponents/index.js";
import AppContextBase from "../../Base/appContext.js";
import { yupResolver } from "@hookform/resolvers/yup";
import { formatedError } from "global/utils.js";
import { isObject } from "lodash";

function LogInPage({ history }) {
  const classes = logInStyles();
  const { setUserData, userData, getUserMetaData } = useContext(AppContextBase);
  const [isLoading, setLoader] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    control,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      [USER_NAME_KEY]: "test_account",
      [PASS_WORD_KEY]: "String@1",
    },
    resolver: yupResolver(LogInServices.getLogInValidations),
  });

  const logIn = async (logInData = {}) => {
    try {
      setLoader(true);
      const payload = {
        [USER_NAME_KEY]: logInData[USER_NAME_KEY].trim(),
        [PASS_WORD_KEY]: logInData[PASS_WORD_KEY].trim(),
      };
      const response = await axiosInstance.post(ApiUrls.LOG_IN, payload);

      const { token, userData } = response.data;
      cookies.set(AUTH_COOKIE_KEY, token);

      await getUserMetaData();
      history.push(AppUrls.HOME_PAGE);
    } catch (err) {
      console.error(err.message || err);
      if (err?.response?.data?.error_type == "INVALID_USER_NAME_PASSWORD") {
        return toast.error("Invalid username or password");
      }
      toast.error(formatedError(err, "Failed to Login User"));
      if (err?.response?.data) {
        if (isObject(err.response.data)) {
          Object.entries(err.response.data || {}).map(([key, val]) => {
            const formError = { type: "server", message: val[0] };
            setError(key, formError);
          });
        }
      }
    } finally {
      setLoader(false);
    }
  };
  return (
    <Container component="main" maxWidth="xs" className={classes.logInContainerStyles}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(logIn)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ReactHookFormInput
                variant="outlined"
                fullWidth
                autoFocus
                autoComplete={LOGIN_FROM_DETAILS[USER_NAME_KEY].autocomplete}
                name={LOGIN_FROM_DETAILS[USER_NAME_KEY].autocomplete}
                label={LOGIN_FROM_DETAILS[USER_NAME_KEY].labelText}
                control={control}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12}>
              <ReactHookFormInput
                variant="outlined"
                fullWidth
                type="password"
                autoComplete={LOGIN_FROM_DETAILS[PASS_WORD_KEY].autocomplete}
                name={LOGIN_FROM_DETAILS[PASS_WORD_KEY].name}
                label={LOGIN_FROM_DETAILS[PASS_WORD_KEY].labelText}
                control={control}
                errors={errors}
              />
            </Grid>
            {/* // TODO @P1: Add this confirmation Checkbox later */}
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          <ButtonComponent
            fullWidth
            type="submit"
            className={classes.submit}
            isLoading={isLoading}
          >
            Log In
          </ButtonComponent>
          <Grid
            item
            xs={12}
            justifyContent="flex-end"
            style={{ marginTop: "0.7rem", textAlign: "right" }}
          >
            <Link to={AppUrls.SIGN_UP} variant="body2">
              Create Account ? Sign Up
            </Link>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default LogInPage;
