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
import EditExpenses from "./editExpenses";
import ConditionalRender from "../../globalComponents/conditionalRender";
import { UserWithProfileImage } from "components/globalComponents/commonComponents";

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

const SPLIT_WITH_KEY = "split_with";
const ViewEditExpenses = ({ history, match, data, afterExpenseAdded }) => {
  const classes = styles();
  const { setUserData, userMetaData, userUtils } = useContext(AppContextBase);
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
  const [defaultEditValues, setDefaultEditValues] = useState({});
  const [isInEditMode, setEditMode] = useState(false);
  const isButtonDisabledRef = useRef({
    isDisabled: false,
    type: "",
  });

  const formateExpenseDataToViewEdit = (data = {}) => {
    const categoryData = {
      title: userMetaData.category_choices[data[CATEGORY_ADD_EXPENSES_DK]],
      id: data[CATEGORY_ADD_EXPENSES_DK],
    };
    const paidBy = groupMetaData?.group_members[data[PAID_BY_ADD_EXPENSES_DK]];

    const defaultValues = {
      id: data.id,
      [TITLE_ADD_EXPENSES_DK]: data[TITLE_ADD_EXPENSES_DK],
      [DESCRIPTION_ADD_EXPENSES_DK]: data[DESCRIPTION_ADD_EXPENSES_DK],
      [CATEGORY_ADD_EXPENSES_DK]: categoryData,
      [TOTAL_AMOUNT_ADD_EXPENSES_DK]: data[TOTAL_AMOUNT_ADD_EXPENSES_DK],
      [PAID_BY_ADD_EXPENSES_DK]: paidBy,
      participants: [],
    };
    data.participants.forEach((data) => {
      const name = `${data.userId}_${data.username}_${SPLIT_WITH_KEY}`;
      defaultValues.participants.push({
        ...data,
        name: name,
      });
      defaultValues[name] = data.amount_paid;
    });
    setDefaultEditValues(defaultValues);
  };

  useEffect(() => {
    formateExpenseDataToViewEdit(data);
  }, []);


  const payedUserData = defaultEditValues[PAID_BY_ADD_EXPENSES_DK] || {};
  return (
    <>
      <Container component="main" maxWidth="sm" className={classes.container}>
        <ConditionalRender
          shouldRender={!isInEditMode}
          elseShowThis={
            <EditExpenses
              isInEditMode={isInEditMode}
              defaultValues={defaultEditValues}
              match={match}
              afterExpenseAdded={afterExpenseAdded}
            />
          }
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h3">
                {defaultEditValues[TITLE_ADD_EXPENSES_DK]}
              </Typography>
              <hr />
              <InlineStyleFlexbox
                justifyContent="flex-start"
                gap="0.5rem"
                fontSize="1.5rem"
                fontWeight="400"
              >
                <UserWithProfileImage
                  altImage={payedUserData?.user?.first_name}
                  profileImage={payedUserData?.profile_image}
                  email={payedUserData?.user?.email}
                  userName={payedUserData?.user?.username}
                /> 
                <Typography variant="h5">
                  paid{" "}
                  {userUtils(
                    defaultEditValues[TOTAL_AMOUNT_ADD_EXPENSES_DK],
                    "formateNumberWithCurrency"
                  )}
                </Typography>
              </InlineStyleFlexbox>
              <hr />
              <Typography variant="h7">Split between:</Typography>
              <InlineStyleFlexbox flexDirection="column" alignItems="unset" gap="0.7rem" marginTop="0.5rem">
                {defaultEditValues.participants?.map((partipant, idx) => {
                  return (
                    <InlineStyleFlexbox
                     justifyContent="space-between"
                      gap="1rem"
                      fontSize="1rem"
                    >
                        <UserWithProfileImage
                          altImage={partipant.user?.first_name}
                          profileImage={partipant?.image}
                          email={partipant.user?.email}
                          userName={partipant?.username}
                        />
                        <div>
                          {userUtils(
                            partipant.amount_paid,
                            "formateNumberWithCurrency"
                          )}
                        </div>
                    </InlineStyleFlexbox>
                  );
                })}
              </InlineStyleFlexbox>
            </Grid>
            <Grid item xs={12}>
              <ButtonComponent onClick={() => setEditMode(true)} fullWidth>
                Edit Expense
              </ButtonComponent>
            </Grid>
          </Grid>
        </ConditionalRender>
      </Container>
    </>
  );
};

export default ViewEditExpenses;
