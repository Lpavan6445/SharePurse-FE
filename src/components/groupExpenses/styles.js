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
            justifyContent: 'space-between',
        },
        gap: '1rem',
        margin: '3rem 0 1rem',
        flexWrap: 'wrap',
    },

}));