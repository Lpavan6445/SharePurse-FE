import React, { useCallback, useContext } from "react";
import { Box, makeStyles, useTheme } from "@material-ui/core";
import AppContextBase from "Base/appContext";
import { ImgInlineStyle, InlineStyleFlexbox, InlineStylecDiv } from "components/globalComponents/InlineStyledCommonComponents";
import { CustomCardComponent, LightTooltip } from "components/globalComponents/commonComponents";
import linesIcons from "assets/linesIcons.svg";
import { numFormatterForMoreThan10K } from "global/utils";

export const styles = makeStyles((theme) => ({
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
}))


const GroupTopCards = ({
  groupBalanceData = {}
}) => {
  const classes = styles();
  const { userMetaData, userUtils } = useContext(AppContextBase);
  const theme = useTheme();

  const getBackDetails = useCallback(() => {
    return (
      <InlineStyleFlexbox
        alignItems="flex-end"
        gap="0.5rem"
        flexDirection="column"
      >
        {Object.entries(groupBalanceData.dict || {}).map(([key, balance]) => {
          if (balance < 0) return "";
          return (
            <InlineStylecDiv fontWeight="700" fontSize="1rem">
              {userMetaData.users?.[key]?.username || key} owes you{" "}
              <span style={{ color: theme.moduleColurs.greencolor }}>
                {userUtils(
                    balance,
                  "formateNumberWithCurrency"
                )}
              </span>
            </InlineStylecDiv>
          );
        })}
      </InlineStyleFlexbox>
    );
  }, [groupBalanceData.dict]);

  const getOweDetails = useCallback(() => {
    return (
      <InlineStyleFlexbox
        alignItems="flex-end"
        gap="0.5rem"
        flexDirection="column"
      >
        {Object.entries(groupBalanceData.dict || {}).map(([key, balance]) => {
          if (balance > 0) return "";
          return (
            <InlineStylecDiv fontWeight="700" fontSize="1rem">
              You owe {userMetaData.users?.[key]?.username || key}{" "}
              <span style={{ color: theme.moduleColurs.redcolor }}>
                {userUtils(
                    balance,
                  "formateNumberWithCurrency"
                )}
              </span>
            </InlineStylecDiv>
          );
        })}
      </InlineStyleFlexbox>
    );
  }, [groupBalanceData.dict]);

  return (
    <Box className={classes.cardsWrapper}>
      <CustomCardComponent className={classes.cardStyles} data-aos="flip-left">
        <Box className={classes.cardTextWrapper}>
          <InlineStylecDiv fontWeight="bold" fontSize="2.5rem">
            {`${userUtils('', 'getCurrencySymbol')} ${numFormatterForMoreThan10K(groupBalanceData.total_spends)}`}
          </InlineStylecDiv>
          <InlineStylecDiv fontSize="1.2rem" color="gray">
            Total Spends
          </InlineStylecDiv>
        </Box>
      </CustomCardComponent>
      <LightTooltip enterDelay={0} title={getBackDetails()} enterTouchDelay={0}>
        <CustomCardComponent className={classes.cardStyles} data-aos="flip-left">
          <Box className={classes.cardTextWrapper}>
            <InlineStylecDiv
              fontWeight="bold"
              fontSize="2.5rem"
              color={theme.moduleColurs.greencolor}
            >
              {`${userUtils('', 'getCurrencySymbol')} ${numFormatterForMoreThan10K(groupBalanceData.total_owed)}`}
            </InlineStylecDiv>
            <InlineStylecDiv fontSize="1.2rem" color="gray">
              You get back
            </InlineStylecDiv>
              <span>
                <ImgInlineStyle
                  src={linesIcons}
                  width={20}
                  height={20}
                  position="absolute"
                  bottom="11px"
                  right="11px"
                  cursor="pointer"
                />
              </span>
          </Box>
        </CustomCardComponent>
      </LightTooltip>
      <LightTooltip  enterDelay={0} title={getOweDetails()} enterTouchDelay={0}>
        <CustomCardComponent className={classes.cardStyles} data-aos="flip-right">
          <Box className={classes.cardTextWrapper}>
            <InlineStylecDiv
              fontWeight="bold"
              fontSize="2.5rem"
              color={theme.moduleColurs.redcolor}
            >
              {`${userUtils('', 'getCurrencySymbol')} ${numFormatterForMoreThan10K(-(groupBalanceData.total_borrowed || -0))}`}
            </InlineStylecDiv>
            <InlineStylecDiv fontSize="1.2rem" color="gray">
              You Owe
            </InlineStylecDiv>
              <span>
                <ImgInlineStyle
                  src={linesIcons}
                  width={20}
                  height={20}
                  position="absolute"
                  bottom="11px"
                  right="11px"
                  cursor="pointer"
                />
              </span>
          </Box>
        </CustomCardComponent>
      </LightTooltip>
      <CustomCardComponent className={classes.cardStyles} data-aos="flip-right">
        <Box className={classes.cardTextWrapper}>
          <InlineStylecDiv fontWeight="bold" fontSize="2.5rem">
            {userUtils(
              groupBalanceData.settled_amount,
              "formateNumberWithCurrency"
            )}
          </InlineStylecDiv>
          <InlineStylecDiv fontSize="1.2rem" color="gray">
            Settled
          </InlineStylecDiv>
        </Box>
      </CustomCardComponent>
    </Box>
  );
};

export default GroupTopCards;
