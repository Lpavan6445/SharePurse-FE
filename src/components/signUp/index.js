import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AppUrls from "../../Base/route/appUrls.js";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EMAIL_KEY,
  FIRSR_NAME,
  LAST_NAME,
  PASS_WORD_KEY,
  SIGN_UP_FROM_DETAILS,
  USER_NAME_KEY,
} from "./constant.js";
import SignUpServices from "./services/signUpService.js";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { signUpStyles } from "./styles.js";
import ReactHookFormInput from "../globalComponents/reactHookFormWrappedComponents/formInput.js";
import { toast } from "react-toastify";
import axiosInstance from "../../Base/api/axios.js";
import ApiUrls from "../../Base/api/apiUrls.js";
import ButtonComponent from "../globalComponents/index.js";
import { AUTH_COOKIE_KEY } from "../../Base/cookie/cookieConstants.js";
import cookies from "../../Base/cookie/cookie.js";
import AppContextBase from "../../Base/appContext.js";
import { yupResolver } from "@hookform/resolvers/yup";

function SignUpPage({ history }) {
  const classes = signUpStyles();
  const { setUserData, userData } = useContext(AppContextBase);
  const [isLoading, setLoader] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      [USER_NAME_KEY]: "",
      [EMAIL_KEY]: "",
      [PASS_WORD_KEY]: "",
    },
    resolver: yupResolver(SignUpServices.getSignUpValidations),
  });

  const signUp = async (signUpData = {}) => {
    try {
      const response = await axiosInstance.post(ApiUrls.SIGN_UP, signUpData);
      const { token, userData } = response;

      setUserData(userData);
      cookies.set(AUTH_COOKIE_KEY, token);
      history.push(AppUrls.HOME_PAGE);
    } catch (err) {
      console.error(err.response?.error || err.message || err);
      toast.error(err.message || "Failed to Sign Up User");
    } finally {
      setLoader(false);
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(signUp)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ReactHookFormInput
                variant="outlined"
                fullWidth
                autoFocus
                autoComplete={SIGN_UP_FROM_DETAILS[USER_NAME_KEY].autocomplete}
                name={SIGN_UP_FROM_DETAILS[USER_NAME_KEY].autocomplete}
                label={SIGN_UP_FROM_DETAILS[USER_NAME_KEY].labelText}
                control={control}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12}>
              <ReactHookFormInput
                variant="outlined"
                fullWidth
                autoFocus
                autoComplete={SIGN_UP_FROM_DETAILS[FIRSR_NAME].autocomplete}
                name={SIGN_UP_FROM_DETAILS[FIRSR_NAME].autocomplete}
                label={SIGN_UP_FROM_DETAILS[FIRSR_NAME].labelText}
                control={control}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12}>
              <ReactHookFormInput
                variant="outlined"
                fullWidth
                autoFocus
                autoComplete={SIGN_UP_FROM_DETAILS[LAST_NAME].autocomplete}
                name={SIGN_UP_FROM_DETAILS[LAST_NAME].autocomplete}
                label={SIGN_UP_FROM_DETAILS[LAST_NAME].labelText}
                control={control}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12}>
              <ReactHookFormInput
                variant="outlined"
                fullWidth
                autoComplete={SIGN_UP_FROM_DETAILS[EMAIL_KEY].autocomplete}
                name={SIGN_UP_FROM_DETAILS[EMAIL_KEY].name}
                label={SIGN_UP_FROM_DETAILS[EMAIL_KEY].labelText}
                control={control}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12}>
              <ReactHookFormInput
                variant="outlined"
                fullWidth
                type="password"
                autoComplete={SIGN_UP_FROM_DETAILS[PASS_WORD_KEY].autocomplete}
                name={SIGN_UP_FROM_DETAILS[PASS_WORD_KEY].name}
                label={SIGN_UP_FROM_DETAILS[PASS_WORD_KEY].labelText}
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
            <Grid item xs={12}>
              <ButtonComponent
                type="submit"
                className={classes.submit}
                isLoading={isLoading}
              >
                Sign Up
              </ButtonComponent>
            </Grid>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to={AppUrls.LOG_IN} variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default SignUpPage;
