import React, { useContext, lazy } from "react";
import { BrowserRouter,  Route, useLocation, useParams, Switch } from 'react-router-dom';

import AppContextBase from "../../Base/appContext";
import AppUrls from './appUrls';
import SignUpPage from '../../components/signUp';
import LogInPage from '../../components/logIn/LogInPage';
import LoggedInLayout from '../../layout';
import LoaderComponent from "components/globalComponents/LoaderComponent";
const RootRouter = () => {
    const { isLoggedIn, isLoading } = useContext(AppContextBase);

    const getLoggedInRoutes = (
        <Switch>
            <Route path={AppUrls.HOME_PAGE} component={LoggedInLayout}/>
            <Route path="*" component={LoggedInLayout} />
        </Switch>
    );

    const getNonLoggedInRoutes = (
        <Switch>
            <Route path={AppUrls.LOG_IN} component={LogInPage}/>
            <Route path={AppUrls.SIGN_UP} component={SignUpPage}/>
            <Route path="*" component={LogInPage} />
        </Switch>
    )

    if (isLoading) {
        return <LoaderComponent />;
    }
    return (
        <BrowserRouter basename={AppUrls.BASE}>
           {isLoggedIn() ? getLoggedInRoutes : getNonLoggedInRoutes}
        </BrowserRouter>
    )
};

export default RootRouter;