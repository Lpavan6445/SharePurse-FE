import React, { useState } from 'react'
import { InlineStylecDiv } from '../../globalComponents/InlineStyledCommonComponents';
import { Grid, Typography } from '@material-ui/core';
import ReactHookSearchWithSelect from '../../globalComponents/reactHookFormWrappedComponents/formSearchWithSelect';
import ButtonComponent from '../../globalComponents';
import { useForm } from 'react-hook-form';
import { formatedError } from '../../../global/utils';
import { toast } from "react-toastify";
import ReactHookFormInput from '../../globalComponents/reactHookFormWrappedComponents/formInput';
import axiosInstance from '../../../Base/api/axios';
import ApiUrls from '../../../Base/api/apiUrls';
import AppUrls from '../../../Base/route/appUrls';

const CREATE_GROUP = {
  name: 'Create Group',
  labelText: 'Group name',
  placeholder: 'Enter group name',
  autocomplete: 'group_name',
  validations: {
      required: {
        message: 'Required',
        value: true,
      },
  }
};
const CreateGroup = ({ history }) => {
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
    // resolver: yupResolver(AddArticleServices.AddArticleValidations),
  });
  const createGroup = async (formData) => {
    try {
      setIsLoading(true);
      const payload = {
        group_name: formData[CREATE_GROUP.name]
      }
      const res = await axiosInstance.post(ApiUrls.CREATE_GROUP, payload);
      history.push(AppUrls.VIEW_GROUP(res.data.group_id));
      toast('Group created successfully!');
    } catch (error) {
      console.error(error.message || "Something Went Wrong");
      toast.error(formatedError(error, true));
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <InlineStylecDiv padding="1rem">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography>
            Group name *
          </Typography>
          <ReactHookFormInput
            variant="outlined"
            fullWidth
            autoFocus
            autoComplete={
              CREATE_GROUP.autocomplete
            }
            name={CREATE_GROUP.name}
            placeholder={
              CREATE_GROUP.placeholder
            }
            rules={CREATE_GROUP.validations}
            control={control}
            errors={errors}
          />
        </Grid>
        <Grid item xs={12}>
          <ButtonComponent
            type="submit"
            onClick={handleSubmit(createGroup)}
            fullWidth
            isLoading={isLoading}
            disabled={isLoading}
          >
            Create Group
          </ButtonComponent>
        </Grid>
      </Grid>
    </InlineStylecDiv>
  )
}

export default CreateGroup;