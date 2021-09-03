import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Loader from './components/Loader/Loader';
import loadable from "@loadable/component";

const routes = [
    {
        path: "/",
        component: loadable(() => import("./components/countries/Countries"), { fallback: <Loader /> }),
        exact: true
    },
    {
        path: "/country/:country",
        component: loadable(() => import("./components/countries/CountryDetail"), { fallback: <Loader /> }),
        exact: true
    }
];

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                {routes.map(route => <Route path={route.path} component={() => <route.component />} key={route.path} exact={route.exact} />)}
            </Switch>
        </BrowserRouter>
    );
};

export default Router;