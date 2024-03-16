import React from 'react';
import { Avatar, Container, IconButton, Tooltip, makeStyles } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import { DividerInlineStyle, InlineStyleFlexbox, InlineStylecDiv } from 'components/globalComponents/InlineStyledCommonComponents'
import { getBeImgaeFullUrl } from 'global/utils'
import EditIcon from "@material-ui/icons/Edit";


const styles = makeStyles((theme) => ({
  groupSettingStyles: {
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        minWidth: '90vw',
    },
    width: '400px',
  },
}));

const GroupSettings = ({
  groupMetaData,
  deleteGroup,
  setEditGroupDetails,
}) => {
  const classes = styles();
  return (
    <Container padding="0.2rem" className={classes.groupSettingStyles}>
    <InlineStylecDiv fontSize="0.8rem" margin="0.3rem 0" fontWeight="600">Update Group</InlineStylecDiv>
    <InlineStyleFlexbox justifyContent="space-between" gap="1rem">
        <InlineStyleFlexbox justifyContent="flex-start" width="100%" gap="1rem">
          <Avatar
            alt={groupMetaData?.group_details.group_name}
            src={getBeImgaeFullUrl(groupMetaData?.group_details?.group_image)}
            variant="square"
          />
          <div
            style={{
              width: "100%",
              maxWidth: "36vw",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textAlign: "left",
            }}
          >
            {groupMetaData?.group_details?.group_name || ""}
          </div>
        </InlineStyleFlexbox>
        <IconButton size="small" onClick={() => setEditGroupDetails(true)}>
          <EditIcon color="black" />
        </IconButton>
    </InlineStyleFlexbox>
    <DividerInlineStyle margin="12px 0" />
    <InlineStylecDiv fontSize="0.81rem" margin="0.3rem 0" fontWeight="600">Group Members</InlineStylecDiv>
    <InlineStyleFlexbox flexDirection="column" alignItems="flex-start" gap="1rem">
      {
        Object.values(groupMetaData?.group_members).map((userData) => {
            return (
              <InlineStyleFlexbox justifyContent="space-between" width="100%" gap="2rem">
                <InlineStyleFlexbox justifyContent="flex-start" gap="1rem">
                  <Avatar
                    alt={userData.user.first_name}
                    src={getBeImgaeFullUrl(userData.profile_image)}
      
                  />
                  <Tooltip title={userData.user.email}>
                    <div
                      style={{
                        width: "100%",
                        maxWidth: "36vw",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textAlign: "left",
                      }}
                    >
                      {userData.user.username || "Unknown"}
                    </div>
                  </Tooltip>
                </InlineStyleFlexbox>
                <IconButton size="small">
                  <Delete color="error" fontSize="small" /> 
                </IconButton>
              </InlineStyleFlexbox>
            )
          })
      }
    </InlineStyleFlexbox>
    <DividerInlineStyle margin="12px 0 0" />
    <InlineStyleFlexbox justifyContent="flex-start" gap="0.5rem" color="red">
      <IconButton onClick={deleteGroup}>
        <Delete color="error" fontSize="small" /> 
      </IconButton>
      <InlineStylecDiv fontWeight="600">Delete Group</InlineStylecDiv>
    </InlineStyleFlexbox>
  </Container>
  )
}

export default GroupSettings;