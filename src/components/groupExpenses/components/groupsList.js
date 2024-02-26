import React, { useContext, useState } from 'react';
import GroupContextBase from '../groupContext';
import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import AppUrls from '../../../Base/route/appUrls';
import AppContextBase from '../../../Base/appContext';
import ButtonComponent from '../../globalComponents';
import CenteredModal from '../../globalComponents/Modal';
import CreateGroup from './createGroup';

const GroupsList = ({ history, match }) => {
  const { setUserData, userMetaData, getUserMetaData } = useContext(AppContextBase);
  const [createGroupModal, setCreateModal] = useState(false);
  const listRow = (groupDt) => {
    return (
      <>
        <ListItem alignItems="flex-start" onClick={() => history.push(AppUrls.VIEW_GROUP(groupDt.id))}>
            <ListItemAvatar>
              <Avatar alt={groupDt.group_name} src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary={groupDt.group_name}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {groupDt.group_name}
                  </Typography>
                </React.Fragment>
              }
            />
        </ListItem>
        <Divider variant="inset" component="li" />
      </>
    )
  };
  console.log(userMetaData, 'userMetaData');
  return (
    <div>
     <ButtonComponent
        type="submit"
        // disabled={isLoading}
        onClick={() => setCreateModal(true)}
      >
        Create Group
      </ButtonComponent>
      <Typography>Groups List</Typography>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {
          userMetaData?.groups?.map((groupDt) => {
            return (
              listRow(groupDt)
            )
          })
        }
      </List>
      <CenteredModal
        isOpen={createGroupModal}
        title="Create Group"
        onClose={() => setCreateModal(false)}
        height={240}
        minHeight={240}
      >
        <CreateGroup history={history} />
      </CenteredModal>
    </div>
  )
}

export default GroupsList;