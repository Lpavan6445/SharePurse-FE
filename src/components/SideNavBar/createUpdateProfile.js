import React, { useContext, useState } from "react";
import {
  EMAIL_KEY,
  FIRSR_NAME,
  LAST_NAME,
  PROFILE_IMAGE,
  SIGN_UP_FROM_DETAILS,
  USER_NAME_KEY,
} from "components/signUp/constant";
import { Avatar, Container, Button as MuiButton } from "@material-ui/core";
import { Grid, Typography, makeStyles, useForkRef } from "@material-ui/core";
import { InlineStylecDiv } from "components/globalComponents/InlineStyledCommonComponents";
import ReactHookFormUploadFiles from "components/globalComponents/reactHookFormWrappedComponents/formUploadInput";
import ReactHookFormInput from "components/globalComponents/reactHookFormWrappedComponents/formInput";
import { IconButton } from "@material-ui/core";
import { Edit as EditIcon } from "@material-ui/icons";
import { toast } from "react-toastify";
// import ButtonComponent from "../../globalComponents";
import { useForm } from "react-hook-form";
import { isObject } from "lodash";
import { getBeImgaeFullUrl } from "global/utils";
import AppContextBase from "Base/appContext";
import ButtonComponent from "components/globalComponents";
import { formatedError } from "global/utils";
import axiosInstance from "Base/api/axios";
import ApiUrls from "Base/api/apiUrls";

const styles = makeStyles((theme) => ({
  profileSettingsWrapper: {
    padding: '1rem',
    maxWidth: '600px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      minWidth: '90vw',
    },
  },
  inputStyles: {
    "& .MuiOutlinedInput-input": {
      padding: "0.7rem",
    },
  },
  avatarStyles: {
    position: "relative",
    height: "150px",
    width: "150px",
    margin: "1rem auto",
    borderRadius: "50%",
    overflow: "hidden",
    boxShadow: "1px 1px 15px -5px black",
    transition: "all .3s ease",

    "&:hover": {
      transform: "scale(1.05)",
      cursor: "pointer",
      "& .editIcon": {
        display: "box",
      },
    },

    "& .MuiAvatar-root": {
      width: "100%",
      height: "100%",
      position: "absolute",
    },
  },
  uploadAvatarInputStyles: {
    opacity: "0",
    width: "100%",
    height: "100%",
    cursor: "pointer",
    "& .MuiInputBase-input": {
      padding: "4rem",
      borderRadius: "50px",
      cursor: "pointer",
    },
  },
  avatarEditIcon: {
    display: "none",
    position: "absolute",
    top: "34%",
    right: "32%",
    cursor: "pointer",
  },
}));

const CreateUpdateProfile = ({ 
  defaultValues = {}, 
  isInEditMode = true,
  afterCreateEditGroupClick = () => {},
}) => {
  const { setUserData, userMetaData, getUserMetaData } =
    useContext(AppContextBase);
  const classes = styles();
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    getValues,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    // resolver: yupResolver(AddArticleServices.AddArticleValidations),
  });
  const [isLoading, setIsLoading] = useState(false);

  const userProfileImage = isObject(watch(PROFILE_IMAGE))
    ? watch(PROFILE_IMAGE)?.[0]
      ? URL.createObjectURL(watch(PROFILE_IMAGE)?.[0])
      : ""
    : getBeImgaeFullUrl(defaultValues[PROFILE_IMAGE] || "");

  const updateProfile = async (formData = {}) => {
    try {
      setIsLoading(true);
      const isImageNotEdited =
      defaultValues[PROFILE_IMAGE] === formData[PROFILE_IMAGE];

      const payload = new FormData();
      payload.append(USER_NAME_KEY, formData[USER_NAME_KEY]);
      payload.append(FIRSR_NAME, formData[FIRSR_NAME]);
      payload.append(LAST_NAME, formData[LAST_NAME]);
      payload.append(EMAIL_KEY, formData[EMAIL_KEY]);

      if (!isImageNotEdited) {
        payload.append(PROFILE_IMAGE, formData[PROFILE_IMAGE][0]);
      }

      const res = await axiosInstance.put(
        ApiUrls.UPDATE_PROFILE,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      await getUserMetaData(false);
      afterCreateEditGroupClick();
      toast("Profile updated successfully!");
    } catch (error) {
      if (error?.response?.data) {
        if (isObject(error.response.data)) {
          if (Object.entries(error.response.data || {}).length) {
            Object.entries(error.response.data || {}).map(([key, val]) => {
              const formError = { type: "server", message: val[0] };
              setError(key, formError);
            });
            return;
          }
        }
      }
      console.error(error.message || "Something Went Wrong");
      toast.error(formatedError(error, true));
    } finally {
      setIsLoading(false);
    }
  };


  const onClick = async (data) => {
    if (isInEditMode) {
      await updateProfile(data);
    } else {
      // await createGroup(data);
    }
  };

  return (
    <Container className={classes.profileSettingsWrapper}>
      <Grid container spacing={2}>
        <Grid itm xs={12}>
          <div className={classes.avatarStyles}>
            <Avatar
              $withBorder
              alt="Avatar"
              src={userProfileImage}
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                cursor: "pointer",
              }}
            />
            <IconButton className={`${classes.avatarEditIcon} editIcon`}>
              <EditIcon />
            </IconButton>
            <ReactHookFormUploadFiles
              variant="outlined"
              fullWidth
              autoComplete={SIGN_UP_FROM_DETAILS[PROFILE_IMAGE].autocomplete}
              name={PROFILE_IMAGE}
              placeholder={SIGN_UP_FROM_DETAILS[PROFILE_IMAGE].placeholder}
              rules={SIGN_UP_FROM_DETAILS[PROFILE_IMAGE].validations}
              control={control}
              errors={errors}
              type="file"
              accept="image/*"
              inputProps={{ multiple: false }}
              allowedTypes={["image/jpeg", "image/png"]}
              className={classes.uploadAvatarInputStyles}
            />
          </div>
        </Grid>
        <Grid item xs={12}>
          <ReactHookFormInput
            variant="outlined"
            fullWidth
            autoFocus
            autoComplete={
              SIGN_UP_FROM_DETAILS[USER_NAME_KEY].autocomplete
            }
            name={SIGN_UP_FROM_DETAILS[USER_NAME_KEY].name}
            label={SIGN_UP_FROM_DETAILS[USER_NAME_KEY].labelText}
            rules={SIGN_UP_FROM_DETAILS[USER_NAME_KEY].validations}
            control={control}
            errors={errors}
          />
        </Grid>
        <Grid item xs={6}>
          <ReactHookFormInput
            variant="outlined"
            fullWidth
            autoComplete={SIGN_UP_FROM_DETAILS[FIRSR_NAME].autocomplete}
            name={SIGN_UP_FROM_DETAILS[FIRSR_NAME].name}
            label={SIGN_UP_FROM_DETAILS[FIRSR_NAME].labelText}
            rules={SIGN_UP_FROM_DETAILS[FIRSR_NAME].validations}
            control={control}
            errors={errors}
          />
        </Grid>
        <Grid item xs={6}>
          <ReactHookFormInput
            variant="outlined"
            fullWidth
            autoComplete={SIGN_UP_FROM_DETAILS[LAST_NAME].autocomplete}
            name={SIGN_UP_FROM_DETAILS[LAST_NAME].name}
            label={SIGN_UP_FROM_DETAILS[LAST_NAME].labelText}
            rules={SIGN_UP_FROM_DETAILS[LAST_NAME].validations}
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
            rules={SIGN_UP_FROM_DETAILS[EMAIL_KEY].validations}
            control={control}
            errors={errors}
            type="email"
          />
        </Grid>
        <Grid item xs={12}>
          <ButtonComponent
            type="submit"
            onClick={handleSubmit(onClick)}
            fullWidth
            isLoading={isLoading}
            disabled={isLoading}
          >
            {!isInEditMode ? "Create Profile" : "Update Profile"}
          </ButtonComponent>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateUpdateProfile;
