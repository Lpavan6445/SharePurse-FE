import React, { useCallback, useContext, useEffect, useState } from "react";
import ApiUrls from "../../../Base/api/apiUrls";
import ConditionalRender from "../../globalComponents/conditionalRender";
import LoaderComponent from "../../globalComponents/LoaderComponent";
import axiosInstance from "../../../Base/api/axios";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@material-ui/core";
import {
  ImgInlineStyle,
  InlineStyleFlexbox,
  InlineStylecDiv,
} from "../../globalComponents/InlineStyledCommonComponents";
import ButtonComponent from "../../globalComponents";
import AppUrls from "../../../Base/route/appUrls";
import CenteredModal from "../../globalComponents/Modal";
import AddMembers from "./addMembers";
import GroupContextBase from "../groupContext";
import AppContextBase from "../../../Base/appContext";
import AddExpenses from "./addExpenses";
import ViewEditExpenses from "./viewEditExpense";
import SettleBalance from "./settleBalance";
import {
  CustomCardComponent,
  PageHeader,
  LightTooltip,
} from "../../globalComponents/commonComponents";
import { viewGroupStyles } from "../styles";
import postiveArrow from "../../../assets/possitiveArrow.svg";
import negetiveArrow from "../../../assets/negetiveArrow.svg";
import movieIconColor from "../../../assets/movieIconColor.svg";
import travelIcon from "../../../assets/travelIcon.svg";
import shoppingIcon from "../../../assets/shoppingIcon.svg";
import arrowBlackColor from "../../../assets/arrowBlackColor.svg";
import linesIcons from "../../../assets/linesIcons.svg";
import moment from "moment";

const ViewGroup = ({ history, match }) => {
  const classes = viewGroupStyles();
  const { userMetaData } = useContext(AppContextBase);
  const { groupMetaData } = useContext(GroupContextBase);
  const [groupExpenses, setGroupExpenses] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [openAddMembersModal, setAddMembersModal] = useState(false);
  const [openAddExpensesModal, setAddExpensesModal] = useState(false);
  const [groupBalanceData, setGroupBalanceData] = useState({});
  const [viewExpenseModal, setViewExpenseModal] = useState({
    modal: false,
    data: {},
  });
  const [openSettleBalanceModal, setOpenSettleBalanceModal] = useState({
    modal: false,
    data: {},
  });
  const theme = useTheme();
  const getGroupExpensesData = async () => {
    try {
      const groupId = match.params.id;
      const res = await axiosInstance.get(ApiUrls.GROUP_EXPENSES(groupId));
      setGroupExpenses(res.data);
    } catch (error) {
      console.error(error.message || "Something Went Wrong");
    }
  };

  const getYourGroupBalances = async () => {
    try {
      const groupId = match.params.id;
      const res = await axiosInstance.get(ApiUrls.GET_GROUP_BALANCES(groupId));
      setGroupBalanceData(res.data);
    } catch (error) {
      console.error(error.message || "Something Went Wrong");
    }
  };

  const intitalApi = async () => {
    setLoading(true);
    await getGroupExpensesData();
    await getYourGroupBalances();
    setLoading(false);
  };
  useEffect(() => {
    intitalApi();
  }, []);

  const afterExpenseAdded = async () => {
    await intitalApi();
    setAddExpensesModal(false);
    setViewExpenseModal({ modal: false, data: {} });
  };

  const viewExpense = (expense) => {
    setViewExpenseModal(expense);
  };

  const getBackDetails = useCallback(() => {
    return (
      <InlineStyleFlexbox
        alignItems="flex-end"
        gap="0.5rem"
        flexDirection="column"
      >
        {Object.entries(groupBalanceData.dict || {}).map(([key, balance]) => {
          if (balance < 0) return "";
          return (
            <InlineStylecDiv fontWeight="700" fontSize="1rem">
              {userMetaData.users?.[key]?.first_name || key} owes you{" "}
              <span style={{ color: theme.moduleColurs.greencolor }}>
                {balance}
              </span>
            </InlineStylecDiv>
          );
        })}
      </InlineStyleFlexbox>
    );
  }, [groupBalanceData.dict]);

  const getOweDetails = useCallback(() => {
    return (
      <InlineStyleFlexbox 
        alignItems="flex-end"
        gap="0.5rem"
        flexDirection="column"
      >
        {Object.entries(groupBalanceData.dict || {}).map(([key, balance]) => {
          if (balance > 0) return "";
          return (
            <InlineStylecDiv fontWeight="700" fontSize="1rem">
              You owe {userMetaData.users?.[key]?.first_name || key}{" "}
              <span style={{ color: theme.moduleColurs.redcolor }}>
                {balance}
              </span>
            </InlineStylecDiv>
          );
        })}
      </InlineStyleFlexbox>
    );
  }, [groupBalanceData.dict]);

  return (
    <ConditionalRender
      shouldRender={!isLoading}
      elseShowThis={<LoaderComponent position="center" />}
    >
      <PageHeader>
        <InlineStyleFlexbox justifyContent="flex-start">
          <ImgInlineStyle
            src={arrowBlackColor}
            width={40}
            height={40}
            cursor="pointer"
            onClick={() => history.push(AppUrls.GROUPS_LIST)}
          />
          {groupMetaData?.group_details?.group_name || ""}
        </InlineStyleFlexbox>
      </PageHeader>
      <Box className={classes.cardsWrapper}>
        <CustomCardComponent
          className={classes.cardStyles}
          data-aos="flip-left"
        >
          <Box className={classes.cardTextWrapper}>
            <InlineStylecDiv fontWeight="bold" fontSize="2.5rem">
              ₹{groupBalanceData.total_owed}
            </InlineStylecDiv>
            <InlineStylecDiv fontSize="1.2rem" color="gray">
              Total Spends
            </InlineStylecDiv>
          </Box>
        </CustomCardComponent>
        <CustomCardComponent
          className={classes.cardStyles}
          data-aos="flip-left"
        >
          <Box className={classes.cardTextWrapper}>
            <InlineStylecDiv
              fontWeight="bold"
              fontSize="2.5rem"
              color={theme.moduleColurs.greencolor}
            >
              ₹{groupBalanceData.total_owed}
            </InlineStylecDiv>
            <InlineStylecDiv fontSize="1.2rem" color="gray">
              You get back
            </InlineStylecDiv>
            <LightTooltip title={getBackDetails()}>
              <span>
                <ImgInlineStyle
                  src={linesIcons}
                  width={20}
                  height={20}
                  position="absolute"
                  bottom="11px"
                  right="11px"
                  cursor="pointer"
                />
              </span>
            </LightTooltip>
          </Box>
        </CustomCardComponent>
        <CustomCardComponent
          className={classes.cardStyles}
          data-aos="flip-right"
        >
          <Box className={classes.cardTextWrapper}>
            <InlineStylecDiv
              fontWeight="bold"
              fontSize="2.5rem"
              color={theme.moduleColurs.redcolor}
            >
              ₹{-groupBalanceData.total_borrowed}
            </InlineStylecDiv>
            <InlineStylecDiv fontSize="1.2rem" color="gray">
              You Owe
            </InlineStylecDiv>
            <LightTooltip title={getOweDetails()}>
              <span>
                <ImgInlineStyle
                  src={linesIcons}
                  width={20}
                  height={20}
                  position="absolute"
                  bottom="11px"
                  right="11px"
                  cursor="pointer"
                />
              </span>
            </LightTooltip>
          </Box>
        </CustomCardComponent>
        <CustomCardComponent
          className={classes.cardStyles}
          data-aos="flip-right"
        >
          <Box className={classes.cardTextWrapper}>
            <InlineStylecDiv fontWeight="bold" fontSize="2.5rem">
              {groupBalanceData.total_borrowed}
            </InlineStylecDiv>
            <InlineStylecDiv fontSize="1.2rem" color="gray">
              Settled
            </InlineStylecDiv>
          </Box>
        </CustomCardComponent>
      </Box>

      <Box className={classes.addButtonsWrapper}>
        <ButtonComponent
          type="submit"
          onClick={() =>
            setOpenSettleBalanceModal({
              modal: true,
              data: groupBalanceData.dict,
            })
          }
        >
          Settle Up
        </ButtonComponent>
        <ButtonComponent
          type="submit"
          onClick={() => setAddExpensesModal(true)}
        >
          Add Expense
        </ButtonComponent>
        <ButtonComponent type="submit" onClick={() => setAddMembersModal(true)}>
          Add Members
        </ButtonComponent>
      </Box>
      <div
        styles={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      >
        <TableContainer component={Paper}>
          <Table aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Paid by</TableCell>
                <TableCell align="left">Amount</TableCell>
                <TableCell align="left">Your Contribution</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ marginTop: "1rem" }}>
              {groupExpenses.map((expense) => {
                return (
                  <TableRow key={`${expense.title}${expense.id}`}>
                    <TableCell
                      align="left"
                      onClick={() =>
                        viewExpense({ modal: true, data: expense })
                      }
                    >
                      {moment(expense.created_at).format("MMM Do YY")}
                    </TableCell>
                    <TableCell
                      align="left"
                      onClick={() =>
                        viewExpense({ modal: true, data: expense })
                      }
                    >
                      {expense.title}
                    </TableCell>
                    <TableCell
                      align="left"
                      onClick={() =>
                        viewExpense({ modal: true, data: expense })
                      }
                    >
                      {expense.paid_by}
                    </TableCell>
                    <TableCell
                      className={classes.greeTextStyle}
                      align="left"
                      onClick={() =>
                        viewExpense({ modal: true, data: expense })
                      }
                    >
                      {expense.total_amount_paid}
                    </TableCell>
                    <TableCell
                      align="left"
                      onClick={() =>
                        viewExpense({ modal: true, data: expense })
                      }
                    >
                      {expense.title}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <CenteredModal
        isOpen={openAddMembersModal}
        title="Add Members"
        onClose={() => setAddMembersModal(false)}
        width="30%"
        height={230}
        minHeight={230}
        minWidth="320px"
      >
        <AddMembers
          groupMembers={Object.keys(groupMetaData?.group_members || {}) || []}
          users={Object.values(userMetaData?.users || {}) || []}
          groupId={match.params.id}
        />
      </CenteredModal>
      <CenteredModal
        isOpen={openAddExpensesModal}
        title="Add Expenses"
        onClose={() => setAddExpensesModal(false)}
        width="fit-content"
        maxWidth="90%"
        height="fit-content"
        minHeight="fit-content"
      >
        <AddExpenses
          history={history}
          match={match}
          afterExpenseAdded={afterExpenseAdded}
        />
      </CenteredModal>
      <CenteredModal
        isOpen={viewExpenseModal.modal}
        title="Edit Expenses"
        onClose={() => setViewExpenseModal({ modal: false, data: {} })}
        width="30%"
        minWidth="320px"
        height="fit-content"
        minHeight="fit-content"
      >
        <ViewEditExpenses
          history={history}
          match={match}
          data={viewExpenseModal.data}
          afterExpenseAdded={afterExpenseAdded}
        />
      </CenteredModal>
      <CenteredModal
        isOpen={openSettleBalanceModal.modal}
        title="Settle Balance"
        onClose={() => setOpenSettleBalanceModal({ modal: false, data: {} })}
        width="30%"
        minWidth="320px"
        height="fit-content"
        minHeight="fit-content"
      >
        <SettleBalance
          afterSettleUp={() => {}}
          history={history}
          match={match}
          data={openSettleBalanceModal.data}
        />
      </CenteredModal>
    </ConditionalRender>
  );
};

export default ViewGroup;
