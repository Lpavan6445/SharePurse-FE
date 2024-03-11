import React, { useContext, useState } from "react";
import GroupContextBase from "../groupContext";
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  makeStyles,
} from "@material-ui/core";
import AppUrls from "../../../Base/route/appUrls";
import AppContextBase from "../../../Base/appContext";
import ButtonComponent from "../../globalComponents";
import CenteredModal from "../../globalComponents/Modal";
import CreateEditGroup from "./createGroup";
import {
  InlineStyleFlexbox,
  InlineStylecDiv,
} from "../../globalComponents/InlineStyledCommonComponents";
import AddIcon from "@material-ui/icons/Add";
import { PageHeader } from "../../globalComponents/commonComponents";
import { getBeImgaeFullUrl } from "global/utils";

const styles = makeStyles((theme) => ({
  groupsListWrapper: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.up("lg")]: {
      justifyContent: "flex-start",
    },
    justifyContent: "center",
    alignItems: "center",
    gap: "2rem",
    flexWrap: "wrap",
    overflowX: "hidden",
  },
  listRow: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",

    width: "202px",
    padding: "1.5rem",
    height: "197px",
    background: "white",
    border: "1px solid #0000000d",
    borderRadius: "0.5rem",
    boxShadow: theme.appBoxShadows.cardShadow,
    cursor: "pointer",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      maxWidth: "95vw",
      height: "151px",
    },
    position: "relative",
  },
  addGroupButton: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "200px",
    padding: "1.5rem",
    height: "209px",
  },
}));
const GroupsList = ({ history, match }) => {
  const classes = styles();
  const { setUserData, userMetaData, getUserMetaData } =
    useContext(AppContextBase);
  const [createGroupModal, setCreateModal] = useState(false);

  const listRow = (groupDt, index) => {
    return (
      <>
        <Box
          className={classes.listRow}
          onClick={() => history.push(AppUrls.VIEW_GROUP(groupDt.id))}
          data-aos={index % 2 == 0 ? "fade-right" : "fade-left"}
        >
          <InlineStylecDiv
            fontSize="1.5rem"
            fontWeight="700"
            width="100%"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            overflow="hidden"
            textAlign="center"
          >
            {groupDt.group_name}
          </InlineStylecDiv>
          <Avatar
            style={{ width: "85px", height: "85px", borderRadius: "150px" }}
            alt={groupDt.group_name}
            src={getBeImgaeFullUrl(groupDt.group_image)}
          />
          <InlineStylecDiv>6 Members</InlineStylecDiv>
        </Box>
      </>
    );
  };

  const addGroup = (setCreateModal) => (
    <>
      <InlineStyleFlexbox
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        padding="1.5rem"
        extraClassNames={classes.listRow}
        onClick={() => setCreateModal(true)}
      >
        <AddIcon style={{ fontSize: "4rem" }} />
      </InlineStyleFlexbox>
    </>
  );

  const afterCreatingGroup = async (groupId) => {
    history.push(AppUrls.VIEW_GROUP(groupId));
  };

  return (
    <div style={{ position: "relative" }}>
      <PageHeader>Groups</PageHeader>
      <Box className={classes.groupsListWrapper}>
        {addGroup(setCreateModal)}
        {userMetaData?.groups?.map((groupDt, index) => {
          return listRow(groupDt, index);
        })}
      </Box>
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
          afterCreateEditGroupClick={afterCreatingGroup}
          isInEditMode={false}
        />
      </CenteredModal>
    </div>
  );
};

export default GroupsList;
