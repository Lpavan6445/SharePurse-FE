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
        [theme.breakpoints.up('lg')]: {
            flexDirection: 'row',
        },
    },
    cardStyles: {
        width: '100%',
        // [theme.breakpoints.up('xs')]: {
        //     width: '100%',
        // },
        // [theme.breakpoints.up('lg')]: {
        //     width: '50%',
        // },
        height: theme.spacing(12),

        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        width: "50%",
        padding: "1rem",
        cursor: 'auto',
    },
    cardTextWrapper: {
        display: "flex",
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
        gap: '1rem',
        margin: '3rem 0 1rem',
    },
}));