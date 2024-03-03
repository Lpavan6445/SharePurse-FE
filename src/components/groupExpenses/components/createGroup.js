import React, { createRef, useState } from "react";
import { InlineStylecDiv } from "../../globalComponents/InlineStyledCommonComponents";
import {
  FormHelperText,
  Grid,
  Typography,
  makeStyles,
  useForkRef,
} from "@material-ui/core";
import ReactHookSearchWithSelect from "../../globalComponents/reactHookFormWrappedComponents/formSearchWithSelect";
import ButtonComponent from "../../globalComponents";
import { useForm } from "react-hook-form";
import { formatedError, getBeImgaeFullUrl } from "../../../global/utils";
import { toast } from "react-toastify";
import ReactHookFormInput from "../../globalComponents/reactHookFormWrappedComponents/formInput";
import axiosInstance from "../../../Base/api/axios";
import ApiUrls from "../../../Base/api/apiUrls";
import AppUrls from "../../../Base/route/appUrls";

import { Avatar, Button as MuiButton } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import {
  CloudUpload as MuiCloudUpload,
  Delete as MuiDelete,
} from "@material-ui/icons";
import { spacing } from "@material-ui/system";
import ReactHookFormUploadFiles from "components/globalComponents/reactHookFormWrappedComponents/formUploadInput";
// import styled from "styled-components";

import { IconButton } from "@material-ui/core";
import { Delete as DeleteIcon, Edit as EditIcon } from "@material-ui/icons";
import ConditionalRender from "components/globalComponents/conditionalRender";
import {
  CREATE_GROUP,
  GROUP_IMAGE,
  GROUP_NAME,
} from "../constants/creatEditGroupConstants";
import { isArray, isObject } from "lodash";

const styles = makeStyles((theme) => ({
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
const CreateEditGroup = ({
  history,
  defaultValues = {},
  isInEditMode = false,
  afterCreateEditGroupClick = () => {},
}) => {
  console.log(defaultValues, "defaultData");
  const classes = styles();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    // resolver: yupResolver(AddArticleServices.AddArticleValidations),
  });

  const createGroup = async (formData) => {
    try {
      setIsLoading(true);

      const payload = new FormData();
      payload.append(GROUP_NAME, formData[GROUP_NAME]);
      payload.append(GROUP_IMAGE, formData[GROUP_IMAGE][0]);

      const res = await axiosInstance.post(ApiUrls.CREATE_GROUP, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      history.push(AppUrls.VIEW_GROUP(res.data.group_id));
      toast("Group created successfully!");
    } catch (error) {
      console.error(error.message || "Something Went Wrong");
      toast.error(formatedError(error, true));
    } finally {
      setIsLoading(false);
    }
  };

  const editGroup = async (formData = {}) => {
    try {
      setIsLoading(true);
      const isImageNotEdited =
        defaultValues[GROUP_IMAGE] === formData[GROUP_IMAGE];

      const payload = new FormData();
      payload.append(GROUP_NAME, formData[GROUP_NAME]);

      if (!isImageNotEdited) {
        payload.append(GROUP_IMAGE, formData[GROUP_IMAGE][0]);
      }

      const res = await axiosInstance.post(
        ApiUrls.EDIT_GROUP_DATA(defaultValues.id),
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      await afterCreateEditGroupClick(res.data.group_id);
      toast("Group updated successfully!");
    } catch (error) {
      console.error(error.message || "Something Went Wrong");
      toast.error(formatedError(error, true));
    } finally {
      setIsLoading(false);
    }
  };

  const onClick = async (data) => {
    if (isInEditMode) {
      await editGroup(data);
    } else {
      await createGroup(data);
    }
  };

  const avatarSrcUrl = isObject(watch(GROUP_IMAGE))
    ? watch(GROUP_IMAGE)?.[0]
      ? URL.createObjectURL(watch(GROUP_IMAGE)?.[0])
      : ""
    : getBeImgaeFullUrl(defaultValues[GROUP_IMAGE] || "");

  return (
    <InlineStylecDiv padding="1rem">
      <Grid container spacing={2}>
        <Grid itm xs={12}>
          <div className={classes.avatarStyles}>
            <Avatar
              $withBorder
              alt="Avatar"
              src={avatarSrcUrl}
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
              autoFocus
              autoComplete={CREATE_GROUP[GROUP_IMAGE].autocomplete}
              name={GROUP_IMAGE}
              placeholder={CREATE_GROUP[GROUP_IMAGE].placeholder}
              rules={CREATE_GROUP[GROUP_NAME].validations}
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
          <Typography>Group name *</Typography>
          <ReactHookFormInput
            variant="outlined"
            fullWidth
            autoFocus
            autoComplete={CREATE_GROUP[GROUP_NAME].autocomplete}
            name={CREATE_GROUP[GROUP_NAME].name}
            placeholder={CREATE_GROUP[GROUP_NAME].placeholder}
            rules={CREATE_GROUP[GROUP_NAME].validations}
            control={control}
            errors={errors}
            className={classes.inputStyles}
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
            {isInEditMode ? "Create Group" : "Update Group"}
          </ButtonComponent>
        </Grid>
      </Grid>
    </InlineStylecDiv>
  );
};

export default CreateEditGroup;
