import React, { useContext, useEffect, useState } from "react";
import ApiUrls from "../../../Base/api/apiUrls";
import ConditionalRender from "../../globalComponents/conditionalRender";
import LoaderComponent from "../../globalComponents/LoaderComponent";
import axiosInstance from "../../../Base/api/axios";
import { Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import { InlineStyleFlexbox } from "../../globalComponents/InlineStyledCommonComponents";
import ButtonComponent from "../../globalComponents";
import AppUrls from "../../../Base/route/appUrls";
import CenteredModal from "../../globalComponents/Modal";
import AddMembers from "./addMembers";
import GroupContextBase from "../groupContext";
import AppContextBase from "../../../Base/appContext";
import AddExpenses from "./addExpenses";
import ViewEditExpenses from "./viewEditExpense";

const ViewGroup = ({ history, match }) => {
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
    setViewExpenseModal({ modal: false, data: {} })
  };

  const viewExpense = (expense) => {
    setViewExpenseModal(expense);
  };

  console.log(
    groupMetaData?.group_members,
    Object.keys(groupMetaData?.group_members || {}),
    "groupMetaData?.group_members"
  );
  return (
    <ConditionalRender
      shouldRender={!isLoading}
      elseShowThis={<LoaderComponent position="center" />}
    >
      <Typography>
        You owe {" "}
        {groupBalanceData.total_owed} 
      </Typography>
      <Typography>
        You borrowed{" "}
        {groupBalanceData.total_borrowed} 
      </Typography>
      <InlineStyleFlexbox justifyContent="flex-start" gap="1rem">
        <ButtonComponent
          type="submit"
          onClick={() => setAddExpensesModal(true)}
        >
          Add Expense
        </ButtonComponent>
        <ButtonComponent type="submit" onClick={() => setAddMembersModal(true)}>
          Add Members
        </ButtonComponent>
      </InlineStyleFlexbox>
      <div sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="right">Title</TableCell>
              <TableCell align="right">Paid by</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Your Contribution</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              groupExpenses.map((expense) => {
                return (
                  <TableRow>
                    <TableCell key={`${expense.title}${expense.id}`} align="right" onClick={() => viewExpense({ modal: true, data: expense })}>
                      {expense.created_at}
                    </TableCell>
                    <TableCell key={`${expense.title}${expense.id}`} align="right" onClick={() => viewExpense({ modal: true, data: expense })}>
                      {expense.title}
                    </TableCell>
                    <TableCell key={`${expense.title}${expense.id}`} align="right" onClick={() => viewExpense({ modal: true, data: expense })}>
                      {expense.paid_by}
                    </TableCell>
                    <TableCell key={`${expense.title}${expense.id}`} align="right" onClick={() => viewExpense({ modal: true, data: expense })}>
                      {expense.total_amount_paid}
                    </TableCell>
                    <TableCell key={`${expense.title}${expense.id}`} align="right" onClick={() => viewExpense({ modal: true, data: expense })}>
                      {expense.title}
                    </TableCell>
                  </TableRow>
                );
              })
            }
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
        width="30%"
        minWidth="320px"
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
    </ConditionalRender>
  );
};

export default ViewGroup;
