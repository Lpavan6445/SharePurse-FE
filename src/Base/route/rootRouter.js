import React, { useContext, lazy } from "react";
import { BrowserRouter,  Route, useLocation, useParams, Switch } from 'react-router-dom';

import AppContextBase from "../../Base/appContext";
import AppUrls from './appUrls';
import SignUpPage from '../../components/signUp';
import LogInPage from '../../components/logIn/LogInPage';
import LoggedInLayout from '../../layout';
import PrimarySearchAppBar from "../../components/Appbar/appbar";
const RootRouter = () => {
    const { isLoggedIn } = useContext(AppContextBase);

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
            <Route path="*" component={SignUpPage} />
        </Switch>
    )
    return (
        <BrowserRouter basename={AppUrls.BASE}>
           {isLoggedIn() ? getLoggedInRoutes : getNonLoggedInRoutes}
        </BrowserRouter>
    )
};

export default RootRouter;