import React, { useContext, useEffect, useState } from "react";
import ApiUrls from "../../../Base/api/apiUrls";
import ConditionalRender from "../../globalComponents/conditionalRender";
import LoaderComponent from "../../globalComponents/LoaderComponent";
import axiosInstance from "../../../Base/api/axios";
import { Divider } from "@material-ui/core";
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
  const [groupBalanceData, setGroupBalanceData] = useState(null);
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
        {
          groupExpenses.map((expense) => {
            return (
              <div
                onClick={() => viewExpense({ modal: true, data: expense })}
                key={`${expense.title}${expense.id}`}
              >
                <InlineStyleFlexbox justifyContent="flex-start">
                  Title : <div>{expense.title}</div>, &nbsp; Amount :
                  <div>{expense.total_amount}</div>
                </InlineStyleFlexbox>
                <Divider />
              </div>
            );
          })
        }
      </div>
      <CenteredModal
        isOpen={openAddMembersModal}
        title="Add Members"
        onClose={() => setAddMembersModal(false)}
        height={230}
        minHeight={230}
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
        minWidth="450px"
        height="80%"
      >
        <AddExpenses
          history={history}
          match={match}
          afterExpenseAdded={afterExpenseAdded}
        />
      </CenteredModal>
      <CenteredModal
        isOpen={viewExpenseModal.modal}
        title="Add Expenses"
        onClose={() => setViewExpenseModal({ modal: false, data: {} })}
        width="30%"
        minWidth="450px"
        height="80%"
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
