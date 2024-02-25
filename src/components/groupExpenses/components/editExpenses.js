import React, { useContext, useEffect, useRef, useState } from "react";
import {
  ADD_EXPENSES_FORM,
  CATEGORY_ADD_EXPENSES_DK,
  DESCRIPTION_ADD_EXPENSES_DK,
  GROUP_ADD_EXPENSES_DK,
  PAID_BY_ADD_EXPENSES_DK,
  TITLE_ADD_EXPENSES_DK,
  TOTAL_AMOUNT_ADD_EXPENSES_DK,
} from "../constants/addExpensesConstants";
import {
  Checkbox,
  Container,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import ReactHookFormInput from "../../globalComponents/reactHookFormWrappedComponents/formInput";
import ReactHookSearchWithSelect, {
  GROUPED_SELECT_KEY,
} from "../../globalComponents/reactHookFormWrappedComponents/formSearchWithSelect";
import GroupContextBase from "../groupContext";
import ButtonComponent from "../../globalComponents";
import {
  InlineStyleFlexbox,
  InlineStylecDiv,
} from "../../globalComponents/InlineStyledCommonComponents";
import axiosInstance from "../../../Base/api/axios";
import ApiUrls from "../../../Base/api/apiUrls";
import { toast } from "react-toastify";
import { formatedError } from "../../../global/utils";
import AppUrls from "../../../Base/route/appUrls";
import AppContextBase from "../../../Base/appContext";

const styles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  splitMoneyWith: {
    height: "200px",
    overflow: "scroll",
    width: "100%",
    marginBottom: "1rem",
    border: "1px solid gray",
    padding: "1rem 1rem 0 1rem",

    display: "flex",
    gap: "1rem",
    flexDirection: "column",
    position: "relative",
    borderRadius: "0.5rem",
  },
  splitWithBox: {
    position: "sticky",
    bottom: "0px",
    borderTop: "1px solid black",
    width: "100%",
    background: "white",
    padding: "0.3rem",
  },
}));

const SPLIT_WITH_KEY = "split_with";
const EditExpenses = ({ defaultValues }) => {
  const classes = styles();
  const { setUserData, userMetaData, getUserMetaData } =
    useContext(AppContextBase);
  const { groupMetaData, setGroupMetadata } = useContext(GroupContextBase);
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
  const isButtonDisabledRef = useRef({
    isDisabled: false,
    type: "",
  });

  const getBalancesTxt = () => {
    const totalAmount = watch(TOTAL_AMOUNT_ADD_EXPENSES_DK);
    const fields = getValues() || {};
    console.log(getValues(), Object.entries(fields));

    let allocatedAmount = 0;
    Object.entries(fields).map(([key, value]) => {
      if (key.includes(SPLIT_WITH_KEY)) {
        allocatedAmount += Number(watch(key)) || 0;
      }
    });

    if (allocatedAmount > totalAmount || allocatedAmount < totalAmount) {
      isButtonDisabledRef.current.isDisabled = true;
    } else {
      isButtonDisabledRef.current.isDisabled = false;
    }
    const leftAmount = totalAmount - allocatedAmount || 0;
    return (
      <>
        {allocatedAmount} of &nbsp;
        {totalAmount || 0}&nbsp; left {leftAmount}
      </>
    );
  };

  console.log(
    userMetaData.category_choices,
    Object.entries(userMetaData.category_choices || {}).map(([key, value]) => ({
      id: key,
      title: value,
    })),
    "Category"
  );
  const categoryOptions = Object.entries(
    userMetaData.category_choices || {}
  ).map(([key, value]) => ({ id: key, title: value }));

  return (
    <>
      <Container component="main" maxWidth="sm">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>
              {ADD_EXPENSES_FORM[TITLE_ADD_EXPENSES_DK].labelText}
            </Typography>
            <ReactHookFormInput
              variant="outlined"
              fullWidth
              autoFocus
              autoComplete={
                ADD_EXPENSES_FORM[TITLE_ADD_EXPENSES_DK].autocomplete
              }
              name={ADD_EXPENSES_FORM[TITLE_ADD_EXPENSES_DK].name}
              placeholder={ADD_EXPENSES_FORM[TITLE_ADD_EXPENSES_DK].placeholder}
              rules={ADD_EXPENSES_FORM[TITLE_ADD_EXPENSES_DK].validations}
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography>
              {ADD_EXPENSES_FORM[CATEGORY_ADD_EXPENSES_DK].labelText}
            </Typography>
            <ReactHookSearchWithSelect
              variant="outlined"
              fullWidth
              autoFocus
              autoComplete={
                ADD_EXPENSES_FORM[CATEGORY_ADD_EXPENSES_DK].autocomplete
              }
              name={ADD_EXPENSES_FORM[CATEGORY_ADD_EXPENSES_DK].name}
              placeholder={
                ADD_EXPENSES_FORM[CATEGORY_ADD_EXPENSES_DK].placeholder
              }
              rules={ADD_EXPENSES_FORM[CATEGORY_ADD_EXPENSES_DK].validations}
              control={control}
              errors={errors}
              options={categoryOptions || []}
              optionUiText="title"
              optionValueKey="id"
              multiple={false}
              defaultValue={[]}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography>
              {ADD_EXPENSES_FORM[PAID_BY_ADD_EXPENSES_DK].labelText}
            </Typography>
            <ReactHookSearchWithSelect
              variant="outlined"
              fullWidth
              autoFocus
              autoComplete={
                ADD_EXPENSES_FORM[PAID_BY_ADD_EXPENSES_DK].autocomplete
              }
              name={ADD_EXPENSES_FORM[PAID_BY_ADD_EXPENSES_DK].name}
              placeholder={
                ADD_EXPENSES_FORM[PAID_BY_ADD_EXPENSES_DK].placeholder
              }
              rules={ADD_EXPENSES_FORM[PAID_BY_ADD_EXPENSES_DK].validations}
              control={control}
              errors={errors}
              options={Object.values(groupMetaData?.group_members || {}) || []}
              optionUiText="first_name"
              optionValueKey="id"
              multiple={false}
              defaultValue={[]}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography>
              {ADD_EXPENSES_FORM[TOTAL_AMOUNT_ADD_EXPENSES_DK].labelText}
            </Typography>
            <ReactHookFormInput
              control={control}
              errors={errors}
              name={ADD_EXPENSES_FORM[TOTAL_AMOUNT_ADD_EXPENSES_DK].name}
              placeholder={
                ADD_EXPENSES_FORM[TOTAL_AMOUNT_ADD_EXPENSES_DK].placeholder
              }
              id="standard-number"
              variant="outlined"
              fullWidth
              autoFocus
              autoComplete={
                ADD_EXPENSES_FORM[TOTAL_AMOUNT_ADD_EXPENSES_DK].autocomplete
              }
              rules={
                ADD_EXPENSES_FORM[TOTAL_AMOUNT_ADD_EXPENSES_DK].validations
              }
              type="number"
            />
          </Grid>
          <InlineStylecDiv width="100%" padding="0 0.5rem">
            <Typography>Split with *</Typography>
            <div className={classes.splitMoneyWith}>
              {Object.values(groupMetaData?.group_members || {})?.map(
                (user) => {
                  return (
                    <>
                      <InlineStyleFlexbox
                        key={`uniq_${user.id}`}
                        justifyContent="space-between"
                        gap="1rem"
                        fontSize="1rem"
                      >
                        <InlineStylecDiv width="50%">
                          {user.first_name} {user.last_name}
                        </InlineStylecDiv>
                        <InlineStylecDiv width="50%">
                          <ReactHookFormInput
                            key={`${user.id}_${user.first_name}_${SPLIT_WITH_KEY}`}
                            control={control}
                            errors={errors}
                            name={`${user.id}_${user.first_name}_${SPLIT_WITH_KEY}`}
                            placeholder={0}
                            id="standard-number"
                            variant="outlined"
                            fullWidth
                            autoFocus
                            rules={{
                              validate: (value) => {
                                if (!value) {
                                  return undefined;
                                }
                                // check is value is number
                                if (isNaN(value)) {
                                  return "Amount should be number";
                                }

                                if (value < 0) {
                                  return "Amount should be greater than 0";
                                }

                                return undefined;
                              },
                            }}
                            type="number"
                            disabled={!watch(TOTAL_AMOUNT_ADD_EXPENSES_DK)}
                          />
                        </InlineStylecDiv>
                      </InlineStyleFlexbox>
                      <hr />
                    </>
                  );
                }
              )}
              <div className={classes.splitWithBox}>{getBalancesTxt()}</div>
            </div>
          </InlineStylecDiv>
          <Grid item xs={12}>
            <ButtonComponent
              type="submit"
              // className={classes.submit}
              // isLoading={isLoading}
              // onClick={handleSubmit}
              // onClick={handleSubmit(addExpense)}
              fullWidth
              disabled={isButtonDisabledRef.current.isDisabled}
            >
              Add Expense
            </ButtonComponent>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default EditExpenses;
