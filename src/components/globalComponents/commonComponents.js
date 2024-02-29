import { Box, withStyles } from "@material-ui/core";

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