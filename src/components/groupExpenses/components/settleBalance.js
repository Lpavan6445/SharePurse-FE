import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
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
import { formatedError } from "../../../global/utils";
import AppUrls from "../../../Base/route/appUrls";
import AppContextBase from "../../../Base/appContext";
import EditExpenses from "./editExpenses";
import ConditionalRender from "../../globalComponents/conditionalRender";
import { 
  CONFIR_SETTLE_FORM,
  SETTLE_UP_PERSONS_VIEW,
  PAYMENT_METHOD,
  SETTLE_BALANCES,
  PAYMENT_METHODS
 } from '../constants/settleBalances';
 import arrowBlackColor from "../../../assets/arrowBlackColor.svg";

const styles = makeStyles((theme) => ({
  container: {
    padding: "1rem",
  },
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

const DEFAULT_VIEW = {
  type: SETTLE_UP_PERSONS_VIEW,
  data: {}
};
const SettleBalance = ({ history, match, data = {}, afterExpenseAdded }) => {
  const theme = useTheme();
  const { userMetaData } = useContext(AppContextBase);
  const [view, setView] = useState(DEFAULT_VIEW);
  const [isLoading, setIsLoading] = useState(false);
  const classes = styles();
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      [PAYMENT_METHOD]: PAYMENT_METHODS[0]
    },
  });


  const showSettleUpForm = (userID) => {
    setView({ 
      type: CONFIR_SETTLE_FORM, 
      data: { settle_up_with: userID } 
    })
  };

  const showListOfBalanceSettledList = useCallback(() => (
    <InlineStyleFlexbox
      flexDirection="column"
      alignItems="space-start"
      gap="0.5rem"
      width="100%"
    >
      {Object.entries(data || {})?.map(([userID, balance], index) => {
        if (balance > 0) return "";
        return (
          <InlineStyleFlexbox justifyContent="space-between">
            <InlineStylecDiv fontWeight="700" fontSize="1rem">
              {index + 1}. You owe{" "}
              <span style={{ fontSize: "1rem" }}>
                {userMetaData.users?.[userID]?.first_name || userID}{" "}
              </span>
              <span style={{ color: theme.moduleColurs.redcolor }}>
                {balance}
              </span>
            </InlineStylecDiv>
            <ButtonComponent 
              size="small" 
              onClick={() => showSettleUpForm(userID)}
            >
              Settle
            </ButtonComponent>
          </InlineStyleFlexbox>
        );
      })}
    </InlineStyleFlexbox>
  ),[data]);

  const settleBalances = (formData={}) => {
    try {
      setIsLoading(true);
      const payload = {
      };
      // const res = await axiosInstance.post();
    } catch (error) {
      console.error(error.message || "Something Went Wrong");
      toast.error(formatedError(error, 'Failed to settle up balances. please try again after some time.'));
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Container component="main" maxWidth="sm" className={classes.container}>
      <ConditionalRender
        shouldRender={!!(view.type === CONFIR_SETTLE_FORM)}
        elseShowThis={showListOfBalanceSettledList()}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <InlineStyleFlexbox justifyContent="flex-start" fontWeight="600" fontSize="0.9rem">
                <ImgInlineStyle
                  src={arrowBlackColor}
                  width={23}
                  height={23}
                  cursor="pointer"
                  onClick={() => setView(DEFAULT_VIEW)}
                />
                Go back
            </InlineStyleFlexbox>
          </Grid>
           <Grid item xs={12}>
            <Typography>
              {SETTLE_BALANCES[PAYMENT_METHOD].labelText}
            </Typography>
            <ReactHookSearchWithSelect
              variant="outlined"
              fullWidth
              autoFocus
              autoComplete={
                SETTLE_BALANCES[PAYMENT_METHOD].autocomplete
              }
              name={SETTLE_BALANCES[PAYMENT_METHOD].name}
              placeholder={SETTLE_BALANCES[PAYMENT_METHOD].placeholder}
              rules={SETTLE_BALANCES[PAYMENT_METHOD].validations}
              control={control}
              errors={errors}
              options={PAYMENT_METHODS || []}
              optionUiText="title"
              optionValueKey="id"
              multiple={false}
              defaultValue={[]}
            />
          </Grid>
          <Grid item xs={12}>
              <ButtonComponent
                type="submit"
                fullWidth
                disabled={isLoading}
                isLoading={isLoading}
                onClick={handleSubmit(settleBalances)}
              >
                Settle
              </ButtonComponent>
            </Grid>
        </Grid>
      </ConditionalRender>
    </Container>
  );
};

export default SettleBalance;
