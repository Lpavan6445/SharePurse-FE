import React, { useContext, useState } from 'react';
import GroupContextBase from '../groupContext';
import { Avatar, Box, Divider, List, ListItem, ListItemAvatar, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, makeStyles } from '@material-ui/core';
import AppUrls from '../../../Base/route/appUrls';
import AppContextBase from '../../../Base/appContext';
import ButtonComponent from '../../globalComponents';
import CenteredModal from '../../globalComponents/Modal';
import CreateGroup from './createGroup';
import { InlineStyleFlexbox, InlineStylecDiv } from '../../globalComponents/InlineStyledCommonComponents';
import AddIcon from '@material-ui/icons/Add';
import { PageHeader } from '../../globalComponents/commonComponents';

const styles = makeStyles((theme) => ({
  listRow: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",

    width:"200px",
    padding:"1.5rem",
    height:"209px",
    background: 'white',
    border: '1px solid #0000000d',
    borderRadius: '0.5rem',
    boxShadow: theme.appBoxShadows.cardShadow,
    cursor: 'pointer',
  },
  groupsListWrapper: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('lg')]: {
      justifyContent: "flex-start",
    },
    justifyContent: "center",
    alignItems: "center",
    gap:"2rem",
    flexWrap:"wrap"
  }
}))
const GroupsList = ({ history, match }) => {
  const classes = styles();
  const { setUserData, userMetaData, getUserMetaData } = useContext(AppContextBase);
  const [createGroupModal, setCreateModal] = useState(false);
  const listRow = (groupDt, index) => {
    return (
      <>
        <Box
          className={classes.listRow}
          onClick={() => history.push(AppUrls.VIEW_GROUP(groupDt.id))}
          data-aos={(index%2 == 0) ? "fade-right" : "fade-left"}
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
            <Avatar style={{ width: '85px', height: '85px', borderRadius: '150px' }} alt={groupDt.group_name} src="https://horizon-ui.com/horizon-tailwind-react/static/media/avatar4.54d5c1de851c273b2cd9.png" />
            <InlineStylecDiv>
              6 Members
            </InlineStylecDiv>
        </Box>
      </>
    )
  };

  const addGroup = (setCreateModal) => (
    <>
        <InlineStyleFlexbox 
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          // gap="1rem"
          width="200px"
          padding="1.5rem"
          height="209px"
          extraClassNames={classes.listRow}
          onClick={() => setCreateModal(true)}
        >
          <AddIcon style={{ fontSize: '4rem' }} />
        </InlineStyleFlexbox>
      </>
  )

  return (
    <div style={{ position: 'relative' }}>
      <PageHeader>
        Groups
      </PageHeader>
      <Box className={classes.groupsListWrapper}>
        {addGroup(setCreateModal)}
        {
          userMetaData?.groups?.map((groupDt, index) => {
            return (
              listRow(groupDt, index)
            )
          })
        }
      </Box>
      <CenteredModal
        isOpen={createGroupModal}
        title="Create Group"
        onClose={() => setCreateModal(false)}
        width="100"
        maxWidth="92%"
        height={240}
        minHeight={240}
      >
        <CreateGroup history={history} />
      </CenteredModal>
    </div>
  )
}

export default GroupsList;