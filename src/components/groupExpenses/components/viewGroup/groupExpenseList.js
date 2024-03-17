import React, { useContext } from "react";
import {
  InlineStyleFlexbox,
  InlineStylecDiv,
} from "components/globalComponents/InlineStyledCommonComponents";
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  useTheme,
} from "@material-ui/core";
import travelIcon from "assets/travelIcon.svg";
import shoppingIcon from "assets/shoppingIcon.svg";
import movieIconColor from "assets/movieIconColor.svg";
import medicalIcon from "assets/medical.svg";
import electronicsIcons from "assets/electronicsIcons.svg";
import invoice from "assets/invoice.svg";
import foodIcon from "assets/foodIcon.svg";
import servicesIcon from "assets/servicesIcon.svg";

import moment from "moment";
import AppContextBase from "Base/appContext";
import GroupContextBase from "components/groupExpenses/groupContext";
import ConditionalRender from "components/globalComponents/conditionalRender";

const styles = makeStyles((theme) => ({
  card: {
    borderRadius: "15px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.02)",
    },
    "& .MuiCardContent-root": {
      paddingBottom: "16px !important",
    },
  },
  avatar: {
    width: '40px',
    height: '40px',
  },
  chip: {
    marginRight: theme.spacing(1),
  },
}));
const GroupExpenseList = ({ data = {}, viewExpense = {} }) => {
  const { userUtils } = useContext(AppContextBase);
  const { groupMetaData, setGroupMetadata } = useContext(GroupContextBase);
  const theme = useTheme();

  const classes = styles();

  const GET_EXPENSES_IMAGES = {
    'tr': travelIcon,
    'ee': electronicsIcons,
    'md': medicalIcon,
    'sp': shoppingIcon,
    'sv': servicesIcon,
    'ot': invoice,
    'mv': movieIconColor,
    'fd': foodIcon,
  }

  return (
    <>
      {Object.entries(data).map(([monthKey, expenses]) => (
        <Grid container spacing={2}>
          {expenses.map((expense, index) => {
            const formatedCreatedExpenseDate = moment(expense.created_at)
              .format("MMM DD")
              .split(" ");
            const paidBy =
              groupMetaData?.group_members[expense.paid_by]?.username || "";
            return (
              <Grid
                item
                xs={12}
                key={`${expense}${expense.id}`}
                data-aos={"fade-up"}
                onClick={() => viewExpense({ modal: true, data: expense })}
                style={{ cursor: "pointer" }}
              >
                <Card className={classes.card}>
                  <CardContent>
                    <InlineStyleFlexbox justifyContent="space-between">
                      <InlineStylecDiv
                        display="flex"
                        alignItems="center"
                        marginBottom={2}
                        gap="1rem"
                      >
                        <InlineStyleFlexbox
                          flexDirection="column"
                          gap="0.47rem"
                        >
                          <Typography variant="subtitle2">
                            {formatedCreatedExpenseDate[0]}
                          </Typography>
                          <Typography variant="subtitle2">
                            {formatedCreatedExpenseDate[1]}
                          </Typography>
                        </InlineStyleFlexbox>
                        <Avatar
                          alt={expense.category}
                          src={GET_EXPENSES_IMAGES[expense.category] || GET_EXPENSES_IMAGES['OTHERS']}
                          className={classes.avatar}
                          variant="square"
                        />
                        <InlineStyleFlexbox
                          flexDirection="column"
                          alignItems="flex-start"
                        >
                          <Typography variant="h6">{expense.title}</Typography>
                          <Typography variant="subtitle2">
                            Total {userUtils(expense.total_amount)}
                          </Typography>
                        </InlineStyleFlexbox>
                      </InlineStylecDiv>
                      <InlineStyleFlexbox
                        flexDirection="column"
                        alignItems="flex-end"
                      >
                        <ConditionalRender
                          shouldRender={
                            expense.user_contribution_in_this_expense
                          }
                          elseShowThis={
                            <Typography variant="subtitle2">
                              not involved
                            </Typography>
                          }
                        >
                          <ConditionalRender 
                            shouldRender={!!(expense.user_contribution_in_this_expense > 0)}
                            elseShowThis={
                              <>
                                <Typography 
                                  variant="subtitle2"
                                  style={{
                                    color:theme.moduleColurs.greencolor,
                                    textAlign: 'end'
                                  }}
                                >
                                  You lent
                                </Typography>
                                <Typography
                                  variant="subtitle2"
                                  style={{
                                    color:theme.moduleColurs.greencolor
                                  }}
                                >
                                  {userUtils(
                                    -(expense.user_contribution_in_this_expense)
                                  )}
                                </Typography>
                              </>
                            }
                          >
                            <Typography 
                              variant="subtitle2"
                              style={{
                                color: theme.moduleColurs.redcolor,
                                textAlign: 'end'
                              }}
                            >
                              You borrowed
                            </Typography>
                            <Typography
                              variant="subtitle2"
                                style={{
                                  color: theme.moduleColurs.redcolor
                                }}
                            >
                              {
                                userUtils(
                                  (expense.user_contribution_in_this_expense)
                                )
                              }
                            </Typography>
                          </ConditionalRender>
                        </ConditionalRender>
                      </InlineStyleFlexbox>
                    </InlineStyleFlexbox>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      ))}
    </>
  );
};

export default GroupExpenseList;
