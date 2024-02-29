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
        columnGap: theme.spacing(2),
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
        height: theme.spacing(15),
    },
}));