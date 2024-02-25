import React, { useContext } from "react";
import { Route, useParams, Switch } from "react-router-dom";
// import AppUrls from './Base/route/appUrls';
import PrimarySearchAppBar from "./components/Appbar/appbar";
import AppContextBase from "./Base/appContext";
import SideNavBar from "./components/SideNavBar/sideNavbar";
import AppUrls from "./Base/route/appUrls";
import GroupExpenses from "./components/groupExpenses";
import { Breadcrumbs, Link, Typography } from "@material-ui/core";
import GroupsList from "./components/groupExpenses/components/groupsList";
const Homepage = React.lazy(() => import("./components/homepage/index.js"));

const LoggedInLayout = () => {
  const { setUserData, userData, logOutUser } = useContext(AppContextBase);
  function handleClick(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }
  return (
    <>
      <PrimarySearchAppBar />
      <br />
      <Breadcrumbs aria-label="breadcrumb">
        <Link href={AppUrls.HOME_PAGE}>Home</Link>
        <Link href={AppUrls.GROUPS_LIST}>Groups</Link>
        <Link href={AppUrls.VIEW_GROUP(":id")}>View Group</Link>
        <Link href={AppUrls.VIEW_EXPENSE(":id", ":expenseId")}>
          ADD_EXPENSES
        </Link>
        <Link href={AppUrls.EDIT_EXPENSE(":id", ":expenseId")}>
          Edit_EXPENSES
        </Link>
      </Breadcrumbs>
      <br />
      <Switch>
        <Route path={AppUrls.HOME_PAGE} component={Homepage} />
        <Route path={AppUrls.GROUPS_LIST} component={GroupsList} />
        <Route path={AppUrls.VIEW_GROUP(":id")} component={GroupExpenses} />
        <Route path="*" component={Homepage} />
      </Switch>
    </>
  );
};

export default LoggedInLayout;
