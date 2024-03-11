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
    groupSettingStyles: {
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            minWidth: '90vw',
        },
        width: '400px',
    },
    topHeaderStyles: {
        [theme.breakpoints.down('sm')]: {
            width: '87%',
        }
    }
}));