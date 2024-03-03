import React, { useCallback, useContext, useEffect, useState } from "react";
import ApiUrls from "../../../../Base/api/apiUrls";
import ConditionalRender from "../../../globalComponents/conditionalRender";
import LoaderComponent from "../../../globalComponents/LoaderComponent";
import axiosInstance from "../../../../Base/api/axios";
import {
  Avatar,
  Box,
  Grid,
  useTheme,
} from "@material-ui/core";
import {
  ImgInlineStyle,
  InlineStyleFlexbox,
  InlineStylecDiv,
} from "components/globalComponents/InlineStyledCommonComponents";
import ButtonComponent from "../../../globalComponents";
import AppUrls from "../../../../Base/route/appUrls";
import CenteredModal from "../../../globalComponents/Modal";
import AddMembers from "../addMembers";
import GroupContextBase from "../../groupContext";
import AppContextBase from "../../../../Base/appContext";
import AddExpenses from "../addExpenses";
import ViewEditExpenses from "../viewEditExpense";
import SettleBalance from "./settleBalance";
import {
  CustomCardComponent,
  PageHeader,
  LightTooltip,
} from "components/globalComponents/commonComponents";
import { viewGroupStyles } from "../../styles";
import arrowBlackColor from "assets/arrowBlackColor.svg";
import linesIcons from "assets/linesIcons.svg";
import GroupExpensesService from "../../services/groupExpensesService";
import { toast } from "react-toastify";
import { formatedError, getBeImgaeFullUrl } from "../../../../global/utils";
import GroupExpenseChart from "./groupExpenseChart";
import CategoryDonutChart from "./categoryDonutChart";
import GroupExpenseList from "./groupExpenseList";
import EditIcon from "@material-ui/icons/Edit";
import CreateEditGroup from "../createGroup";
import GroupTopCards from "./groupTopCards";

const ViewGroup = ({ history, match }) => {
  const classes = viewGroupStyles();
  const { userMetaData, userUtils } = useContext(AppContextBase);
  const { groupMetaData, getGroupExpensesMetaData } =
    useContext(GroupContextBase);
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
  const [createGroupModal, setCreateModal] = useState(false);

  const groupId = match.params.id;
  const theme = useTheme();
  const getGroupExpensesData = async () => {
    try {
      const groupId = match.params.id;
      const res = await axiosInstance.get(ApiUrls.GROUP_EXPENSES(groupId));

      const formatedData = GroupExpensesService.groupDataByMonth(res.data);
      console.log(formatedData, "formatedData");
      setGroupExpenses(formatedData);
    } catch (error) {
      console.error(error.message || "Something Went Wrong");
      toast.error(formatedError(error, true));
    }
  };

  const getYourGroupBalances = async () => {
    try {
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

  const afterGroupEdit = async () => {
    await getGroupExpensesMetaData(false);
    setCreateModal(false);
  };
  return (
    <ConditionalRender
      shouldRender={!isLoading}
      elseShowThis={<LoaderComponent position="center" />}
    >
      <PageHeader>
        <InlineStyleFlexbox justifyContent="flex-start" gap="1rem">
          <ImgInlineStyle
            src={arrowBlackColor}
            width={40}
            height={40}
            cursor="pointer"
            onClick={() => history.push(AppUrls.GROUPS_LIST)}
          />
          <Avatar
            alt={groupMetaData?.group_details.group_name}
            src={getBeImgaeFullUrl(groupMetaData?.group_details?.group_image)}
          />
          {groupMetaData?.group_details?.group_name || ""}
          <EditIcon onClick={() => setCreateModal(true)} />
        </InlineStyleFlexbox>
      </PageHeader>
      <>
        <GroupTopCards groupBalanceData={groupBalanceData} />
        <Box className={classes.cardsWrapper}>
          <CustomCardComponent
            className={classes.cardStyles}
            data-aos="flip-left"
          >
            <Box className={classes.cardTextWrapper}>
              <InlineStylecDiv fontWeight="bold" fontSize="2.5rem">
                {userUtils(
                  groupBalanceData.total_spends,
                  "formateNumberWithCurrency"
                )}
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
                {userUtils(
                  groupBalanceData.total_owed,
                  "formateNumberWithCurrency"
                )}
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
                {userUtils(
                  -(groupBalanceData.total_borrowed || -0),
                  "formateNumberWithCurrency"
                )}
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
                {userUtils(
                  groupBalanceData.settled_amount,
                  "formateNumberWithCurrency"
                )}
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
          <ButtonComponent
            type="submit"
            onClick={() => setAddMembersModal(true)}
          >
            Add Members
          </ButtonComponent>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} xl={6} lg={6}>
            <GroupExpenseList data={groupExpenses} viewExpense={viewExpense} />
          </Grid>
          <Grid item xs={12} xl={6} lg={6}>
            <Grid container spacing={4}>
              <Grid item xs={12} data-aos="fade-up">
                <CustomCardComponent>
                  <GroupExpenseChart
                    graphData={
                      groupMetaData.group_analytics.total_amount_by_month
                    }
                  />
                </CustomCardComponent>
              </Grid>
              <Grid item xs={12} data-aos="fade-up">
                <CustomCardComponent>
                  <CategoryDonutChart
                    graphData={
                      groupMetaData.group_analytics.total_amount_by_category
                    }
                  />
                </CustomCardComponent>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

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
            groupId={groupId}
            afterExpenseAdded={afterExpenseAdded}
          />
        </CenteredModal>

        <CenteredModal
          isOpen={createGroupModal}
          title="Create Group"
          onClose={() => setCreateModal(false)}
          width="fit-content"
          maxWidth="92%"
          height="fit-content"
          minHeight={240}
        >
          <CreateEditGroup
            history={history}
            defaultValues={groupMetaData?.group_details || {}}
            afterCreateEditGroupClick={afterGroupEdit}
            isInEditMode={true}
          />
        </CenteredModal>
      </>
    </ConditionalRender>
  );
};

export default ViewGroup;
