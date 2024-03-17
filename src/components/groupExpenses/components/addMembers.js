import React, { useContext, useState } from 'react';
import ReactHookSearchWithSelect from '../../globalComponents/reactHookFormWrappedComponents/formSearchWithSelect';
import { useForm } from 'react-hook-form';
import { formatedError } from '../../../global/utils';
import { toast } from "react-toastify";
import { Container, Grid, Typography } from '@material-ui/core';
import ButtonComponent from '../../globalComponents';
import { InlineStylecDiv } from '../../globalComponents/InlineStyledCommonComponents';
import ApiUrls from '../../../Base/api/apiUrls';
import axiosInstance from '../../../Base/api/axios';
import GroupContextBase from '../groupContext';
import { UserWithProfileImage } from 'components/globalComponents/commonComponents';

const ADD_MEMBERS = {
  name: 'Add Members',
  labelText: 'Users',
  placeholder: 'Select user',
  autocomplete: 'title',
  validations: {
      required: {
        message: 'Required',
        value: true,
      },
  }
}
const AddMembers = ({
  groupMembers = [], 
  users = [],
  groupId = '',
}) => {
  const { groupMetaData, getGroupExpensesMetaData } = useContext(GroupContextBase);
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

  const addMembers = async (formData = {}) => {
    try {
      setIsLoading(true);
      const payload = {
        friends: []
      }
      formData[ADD_MEMBERS.name].map((user) => {
        payload.friends.push(user.id)
      })
      const res = await axiosInstance.post(ApiUrls.ADD_MEMEBERS_TO_GROUP(groupId), payload);
      await getGroupExpensesMetaData();
    } catch (error) {
      console.error(error.message || "Something Went Wrong");
      toast.error(formatedError(error, true));
    } finally {
      setIsLoading(false);
    }
  }

  const filterUsersByGroupMemebers = users.filter((user) => {
    const userId = user.id;
    if (!groupMembers.includes(userId.toString())) {
      return true
    }
    return false
  });
  
  return (
    <InlineStylecDiv padding="1rem">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography>
            Users *
          </Typography>
          <ReactHookSearchWithSelect
            variant="outlined"
            fullWidth
            autoFocus
            autoComplete={
              ADD_MEMBERS.autocomplete
            }
            name={ADD_MEMBERS.name}
            placeholder={
              ADD_MEMBERS.placeholder
            }
            rules={ADD_MEMBERS.validations}
            control={control}
            errors={errors}
            options={filterUsersByGroupMemebers || []}
            optionUiText="username"
            optionValueKey="id"
            multiple={true}
            defaultValue={[]}
            renderOption={(props, option, z) => {
                  return (
                    <div style={{ padding: "0.2rem 1rem" }} {...props}>
                      <UserWithProfileImage
                        altImage={option.user.first_name}
                        profileImage={option.profile_image}
                        email={option.user.email}
                        userName={option.user.username}
                      />
                    </div>
                  );
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <ButtonComponent
            type="submit"
            onClick={handleSubmit(addMembers)}
            fullWidth
            disabled={isLoading}
          >
            Add Memeber(s)
          </ButtonComponent>
        </Grid>
      </Grid>
    </InlineStylecDiv>
  )
}

export default AddMembers;