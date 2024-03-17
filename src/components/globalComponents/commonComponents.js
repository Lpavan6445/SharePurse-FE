import { Avatar, Box, Tooltip, withStyles } from "@material-ui/core";
import { InlineStyleFlexbox } from "./InlineStyledCommonComponents";
import { getBeImgaeFullUrl } from "global/utils";
import GroupExpensesService from "components/groupExpenses/services/groupExpensesService";

export const PageHeader = withStyles((theme) => ({
   root: {
       position: 'sticky',
        top: '0',
        backdropFilter: 'blur(24px)',
        [theme.breakpoints.up('xs')]: {
            padding: theme.spacing(1.3),
        },
        [theme.breakpoints.up('sm')]: {
           padding: theme.spacing(1.3),
        },
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(2),
         },
        backgroundColor: 'hsla(0, 0%, 100%, .1)',
        zIndex: 1,
        fontWeight:"700",
        fontSize:"2rem"
   } 
}))(Box);

export const CustomCardComponent = withStyles((theme) => ({
   root: {
      background: 'white',
      border: '1px solid #0000000d',
      borderRadius: '1.25rem',
      boxShadow: theme.appBoxShadows.cardShadow,
      cursor: 'pointer',
      padding: "18px",
   } 
}))(Box);

export const LightTooltip = withStyles((theme) => ({
   tooltip: {
     backgroundColor: 'white',
     color: 'rgba(0, 0, 0, 0.87)',
     boxShadow: `${theme.moduleColurs.globalcolor} 0px 1px 3px 0px`,
     fontSize: 11,
   //   border: `1px solid ${theme.moduleColurs.globalcolor}`
   },
 }))(Tooltip);


export const UserWithProfileImage = ({
   altImage = '',
   profileImage = '',
   email = '',
   userName = '',
}) => {
   return (
      <InlineStyleFlexbox
         justifyContent="flex-start"
         gap="1rem"
     >
      <Avatar
        alt={altImage}
        src={getBeImgaeFullUrl(profileImage)}
      />
      <Tooltip title={email}>
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
          {userName || "Unknown"}
        </div>
      </Tooltip>
     </InlineStyleFlexbox>
   )
}; 



export const CategoryWithText = ({
   categoryId = '',
   categoryTitle = ''
}) => {
   return (
      <InlineStyleFlexbox
         justifyContent="flex-start"
         gap="1rem"
     >
      <Avatar
        alt={''}
        src={GroupExpensesService.getExpensCategoryIcons(categoryId)}
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
         {categoryTitle || "Unknown"}
      </div>
     </InlineStyleFlexbox>
   )
}; 