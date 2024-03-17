import React, { useContext, useRef, useState } from "react";
import {
  ADD_EXPENSES_FORM,
  CATEGORY_ADD_EXPENSES_DK,
  DESCRIPTION_ADD_EXPENSES_DK,
  GROUP_ADD_EXPENSES_DK,
  PAID_BY_ADD_EXPENSES_DK,
  PARTICIPANTS_ADD_EXPENSES_DK,
  SPLIT_BY,
  SPLIT_EQUALLY,
  SPLIT_TYPE_OPTIONS,
  SPLIT_UNEQUALLY,
  TITLE_ADD_EXPENSES_DK,
  TOTAL_AMOUNT_ADD_EXPENSES_DK,
} from "../constants/addExpensesConstants";
import {
  Avatar,
  Checkbox,
  Container,
  Grid,
  Tooltip,
  Typography,
  makeStyles,
  useTheme,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import ReactHookFormInput from "../../globalComponents/reactHookFormWrappedComponents/formInput";
import ReactHookSearchWithSelect, {
  GROUPED_SELECT_KEY,
} from "../../globalComponents/reactHookFormWrappedComponents/formSearchWithSelect";
import GroupContextBase from "../groupContext";
import ButtonComponent from "../../globalComponents";
import {
  ImgInlineStyle,
  InlineStyleFlexbox,
  InlineStylecDiv,
} from "../../globalComponents/InlineStyledCommonComponents";
import axiosInstance from "../../../Base/api/axios";
import ApiUrls from "../../../Base/api/apiUrls";
import { toast } from "react-toastify";
import { formatedError, getBeImgaeFullUrl, roundOfNumberWithMinimumAndMaxPrecission } from "../../../global/utils";
import AppUrls from "../../../Base/route/appUrls";
import AppContextBase from "../../../Base/appContext";
import { cloneDeep } from "lodash";
import ConditionalRender from "components/globalComponents/conditionalRender";
import arrowBlackColor from "assets/arrowBlackColor.svg";
import { CategoryWithText, UserWithProfileImage } from "components/globalComponents/commonComponents";
import { AddEditExpensesStyles } from "../styles";

const SPLIT_WITH_KEY = "split_with";
const STEP_1 = "STEP_1";
const STEP_2 = "STEP_2";
const AddExpenses = ({ history, match, afterExpenseAdded }) => {
  const classes = AddEditExpensesStyles();
  const { userUtils, userMetaData, getUserMetaData } =
    useContext(AppContextBase);
  const { groupMetaData, setGroupMetadata } = useContext(GroupContextBase);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(STEP_1);
  const theme = useTheme();

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    getValues,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    // resolver: yupResolver(AddArticleServices.AddArticleValidations),
  });
  const isButtonDisabledRef = useRef({
    isDisabled: true,
    type: "",
  });

  const addExpense = async (formData = {}) => {
    try {
      setIsLoading(true);
      const groupId = match.params.id;
      const payload = {
        title: formData.title,
        description: "",
        total_amount: formData.total_amount,
        paid_by: formData.paid_by.id,
        participants: [],
        category: formData[CATEGORY_ADD_EXPENSES_DK].id,
      };
      Object.entries(formData).map(([key, value]) => {
        if (key.includes(SPLIT_WITH_KEY) && value > 0) {
          const split_id = key.split("_");
          payload.participants.push({
            user_id: split_id[0],
            amount_paid: value,
          });
        }
      });
      const res = await axiosInstance.post(
        ApiUrls.ADD_GROUP_EXPENSES(groupId),
        payload
      );
      await afterExpenseAdded();
    } catch (error) {
      console.error(error.message || "Something Went Wrong");
      toast.error(formatedError(error, true));
    } finally {
      setIsLoading(false);
    }
  };

  const getBalancesTxt = () => {
    const totalAmount = watch(TOTAL_AMOUNT_ADD_EXPENSES_DK);
    const fields = getValues() || {};

    let allocatedAmount = 0;
    Object.entries(fields).map(([key, value]) => {
      if (key.includes(SPLIT_WITH_KEY)) {
        allocatedAmount += Number(watch(key)) || 0;
      }
    });

    if (allocatedAmount > totalAmount || allocatedAmount < totalAmount) {
      isButtonDisabledRef.current.isDisabled = true;
    } else {
      if (totalAmount) {
        isButtonDisabledRef.current.isDisabled = false;
      }
    }
    const leftAmount = totalAmount - allocatedAmount || 0;

    const color =
      (leftAmount == 0 && theme.moduleColurs.greencolor) ||
      (leftAmount < 0 && theme.moduleColurs.redcolor);

    const formateWithCurrency = (val) => {
      return userUtils(val, "formateNumberWithCurrency")
    };
    return (
      <span>
        {formateWithCurrency(allocatedAmount)} of &nbsp;
        {formateWithCurrency(totalAmount) || 0}&nbsp; left{" "}
        <span style={{ color: color }}>{formateWithCurrency(leftAmount)}</span>
      </span>
    );
  };

  const categoryOptions = Object.entries(
    userMetaData.category_choices || {}
  ).map(([key, value]) => ({ id: key, title: value }));
  const clonedGroupMembersData = cloneDeep(groupMetaData?.group_members);

  const onButtonClick = () => {
    if (currentStep === STEP_2) {
      // submit form
      handleSubmit(addExpense)();
    }

    if (currentStep === STEP_1) {
      setCurrentStep(STEP_2);
    }
  };

  const generateUniqKey = (user) => {
    return `${user.id}_${user.username}_${SPLIT_WITH_KEY}`;
  };

  return (
    <>
      <Container component="main" maxWidth="sm" className={classes.container}>
        <Grid container spacing={2}>
          <ConditionalRender shouldRender={currentStep === STEP_1}>
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
                placeholder={
                  ADD_EXPENSES_FORM[TITLE_ADD_EXPENSES_DK].placeholder
                }
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
                renderOption={(props, option, z) => {
                  return (
                    <div style={{ padding: "0.2rem 1rem" }} {...props}>
                      <CategoryWithText
                        categoryId={option.id}
                        categoryTitle={option.title}
                      />
                    </div>
                  );
                }}
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
                options={
                  Object.values(groupMetaData?.group_members || {}) || []
                }
                optionUiText="username"
                optionValueKey="id"
                multiple={false}
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
          </ConditionalRender>

          <ConditionalRender shouldRender={currentStep === STEP_2}>
            <Grid item xs={12}>
              <InlineStyleFlexbox
                justifyContent="flex-start"
                fontWeight="600"
                fontSize="0.9rem"
                cursor="pointer"
                onClick={() => setCurrentStep(STEP_1)}
              >
                <ImgInlineStyle
                  src={arrowBlackColor}
                  width={23}
                  height={23}
                  cursor="pointer"
                />
                Go back
              </InlineStyleFlexbox>
            </Grid>
            <Grid item xs={12}>
              <Typography>{ADD_EXPENSES_FORM[SPLIT_BY].labelText}</Typography>
              <ReactHookSearchWithSelect
                variant="outlined"
                fullWidth
                autoFocus
                autoComplete={ADD_EXPENSES_FORM[SPLIT_BY].autocomplete}
                name={ADD_EXPENSES_FORM[SPLIT_BY].name}
                placeholder={ADD_EXPENSES_FORM[SPLIT_BY].placeholder}
                control={control}
                errors={errors}
                options={Object.values(SPLIT_TYPE_OPTIONS)}
                optionUiText="text"
                optionValueKey="value"
                multiple={false}
                defaultValue={[]}
                afterChangeFun={(changedValue) => {
                  const totalAmount = watch(TOTAL_AMOUNT_ADD_EXPENSES_DK);
                  const fields = getValues() || {};
                  let allocatedAmount = 0;
                  if (changedValue.value === SPLIT_EQUALLY) {
                    const numberOfUsers = Object.values(
                      clonedGroupMembersData || {}
                    ).length;
                    const splitEqually = roundOfNumberWithMinimumAndMaxPrecission(totalAmount / numberOfUsers, 2, 2);
                    const roudnOfValue = totalAmount - (splitEqually * numberOfUsers);

                    Object.values(clonedGroupMembersData || {})?.map((user, idx) => {
                      const uniqKey = generateUniqKey(user);
                      if (idx === numberOfUsers) {
                        setValue(uniqKey, (splitEqually + roudnOfValue));
                        return
                      }
                      setValue(uniqKey, splitEqually);
                    });
                  }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <InlineStylecDiv>
                <Typography>Split with *</Typography>
                <div className={classes.splitMoneyWith}>
                  {Object.values(clonedGroupMembersData || {})?.map((user) => {
                    const name = generateUniqKey(user);
                    register(name);
                    return (
                      <>
                        <InlineStyleFlexbox
                          key={`uniq_${user.id}`}
                          justifyContent="space-between"
                          gap="1rem"
                          fontSize="1rem"
                        >
                          <UserWithProfileImage
                            altImage={user.user?.first_name}
                            profileImage={user?.profile_image}
                            email={user.user?.email}
                            userName={user.user?.username}
                          />
                          <InlineStylecDiv width="40%">
                            <ReactHookFormInput
                              key={name}
                              control={control}
                              errors={errors}
                              name={name}
                              placeholder={0}
                              id="standard-number"
                              variant="outlined"
                              fullWidth
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
                              afterChangeFun={(changedValue) => {
                                const spliteBy = watch(SPLIT_BY);
                                if (spliteBy?.value === SPLIT_EQUALLY) {
                                  setValue(
                                    SPLIT_BY,
                                    SPLIT_TYPE_OPTIONS[SPLIT_UNEQUALLY]
                                  );
                                }
                              }}
                            />
                          </InlineStylecDiv>
                        </InlineStyleFlexbox>
                        <hr />
                      </>
                    );
                  })}
                </div>
              </InlineStylecDiv>
            </Grid>
            <div className={classes.splitWithBox}>{getBalancesTxt()}</div>
          </ConditionalRender>

          <Grid item xs={12}>
            <ButtonComponent
              isLoading={isLoading}
              type={currentStep === STEP_2 ? "submit" : "button"}
              onClick={onButtonClick}
              fullWidth
              disabled={
                currentStep === STEP_2
                  ? isButtonDisabledRef.current.isDisabled
                  : !isValid
              }
            >
              {currentStep === STEP_2 ? "Add Expense" : "Next"}
            </ButtonComponent>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default AddExpenses;
