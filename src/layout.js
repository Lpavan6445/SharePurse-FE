import React, { Suspense, useContext } from "react";
import { Route, useParams, Switch } from "react-router-dom";
import AppUrls from "./Base/route/appUrls";
import GroupExpenses from "./components/groupExpenses";
import FixedSidebar from "./components/SideNavBar/fixedSidebar.js";
import LoaderComponent from "./components/globalComponents/LoaderComponent/index.js";

const GroupsList = React.lazy(() => import("./components/groupExpenses/components/groupsList"));

const LoggedInLayout = ({ history, match }) => {
  return (
    <>
      <FixedSidebar history={history}>
        <Suspense fallback={<LoaderComponent />}>
          <Switch>
            <Route path={AppUrls.GROUPS_LIST} component={GroupsList} />
            <Route path={AppUrls.VIEW_GROUP(":id")} component={GroupExpenses} />
            <Route path="*" component={GroupsList} />
          </Switch>
        </Suspense>
      </FixedSidebar>
    </>
  );
};

export default LoggedInLayout;
