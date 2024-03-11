import React, { Suspense, useContext } from "react";
import { Route, useParams, Switch } from "react-router-dom";
// import AppUrls from './Base/route/appUrls';
import PrimarySearchAppBar from "./components/Appbar/appbar";
import AppContextBase from "./Base/appContext";
import SideNavBar from "./components/SideNavBar/sideNavbar";
import AppUrls from "./Base/route/appUrls";
import GroupExpenses from "./components/groupExpenses";
import { Breadcrumbs, Container, Link, Typography } from "@material-ui/core";
import GroupsList from "./components/groupExpenses/components/groupsList";
import AppAppBar from "./AppAppBar.js";
import Wrapper from "./hero.js";
import FixedSidebar from "./components/SideNavBar/fixedSidebar.js";
import LoaderComponent from "./components/globalComponents/LoaderComponent/index.js";

const Homepage = React.lazy(() => import("./components/homepage/index.js"));
const PersonalExpenses = React.lazy(() => import("./components/PersonalExpenses/index.js"));

const LoggedInLayout = ({ history, match }) => {
  const { setUserData, userData, logOutUser, mode } = useContext(AppContextBase);
  function handleClick(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }
  return (
    <>
      {/* <AppAppBar history={history} /> */}
      {/* <Wrapper> */}
      <FixedSidebar history={history}>
        <Suspense fallback={<LoaderComponent />}>
          <Switch>
            <Route path={AppUrls.HOME_PAGE} component={Homepage} />
            <Route path={AppUrls.GROUPS_LIST} component={GroupsList} />
            <Route path={AppUrls.VIEW_GROUP(":id")} component={GroupExpenses} />
            <Route path={AppUrls.PERSONAL_EXPENSE} component={PersonalExpenses} />
            <Route path="*" component={Homepage} />
          </Switch>
        </Suspense>
      </FixedSidebar>
      {/* </Wrapper> */}
    </>
  );
};

export default LoggedInLayout;
