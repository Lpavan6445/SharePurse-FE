import { makeStyles } from "@material-ui/core";

export const viewGroupStyles = makeStyles((theme) => ({
    greeTextStyle: {
        color: theme.moduleColurs.greencolor,
        fontWeight: 600
    },
    cardsWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        columnGap: theme.spacing(6),
        rowGap: theme.spacing(1),
        flexDirection: 'column',
        [theme.breakpoints.up('md')]: {
            flexDirection: 'row',
        },
        margin: '1rem 0',
        padding: '1rem'
    },
    cardStyles: {
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            height: '3.125rem',
        },
        [theme.breakpoints.up('lg')]: {
            width: '50%',
            height: '6rem'
        },

        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem",
    },
    cardTextWrapper: {
        display: "flex",
        [theme.breakpoints.down('sm')]: {
            flexDirection: "row-reverse",
            gap: '1rem',
            alignItems: "center",
        },

        justifyContent: "center",
        flexDirection: "column",
        fontSize: "1.5rem" ,
        fontWeight: "700",
        width: "100%",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textAlign: "center",
        height: "100%",
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