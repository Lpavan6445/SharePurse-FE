import { makeStyles } from "@material-ui/core";

export const viewGroupStyles = makeStyles((theme) => ({
    greeTextStyle: {
        color: theme.moduleColurs.greencolor,
        fontWeight: 600
    },
    addButtonsWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'flex-start',
            margin: '0.2rem 0 1rem',
        },
        gap: '1rem',
        margin: '3rem 0 1rem',
        flexWrap: 'wrap',
    },
    topHeaderStyles: {
        [theme.breakpoints.down('sm')]: {
            width: '87%',
        }
    }
}));


export const AddEditExpensesStyles = makeStyles((theme) => ({
    container: {
        [theme.breakpoints.up("sm")]: {
            width: "405px",
        },
        padding: "1rem",
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    splitMoneyWith: {
        overflow: "scroll",
        // width: "100%",
        marginBottom: "1rem",
        border: "1px solid gray",
        padding: "1rem 1rem 0 1rem",
    
        display: "flex",
        flexDirection: "column",
        position: "relative",
        borderRadius: "0.5rem",
    },
    splitWithBox: {
        textAlign: "end",
        width: "95%",
        background: "white",
        padding: "0.3rem 0.5rem",
        left: 0,
    },
}))