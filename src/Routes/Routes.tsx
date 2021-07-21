import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../Components/Pages/Login';
import Admin from '../Components/Pages/Admin';
import NotFound from '../Components/Pages/NotFound/NotFound';
import PrivateRoute from '../Components/Utilities/PrivateRoute';

const Routes: React.FC = () => {
    return (
        <Switch>
            <Route exact path="/">
                <Login />
            </Route>
            <PrivateRoute path="/admin">
                <Admin />
            </PrivateRoute>
            <Route path="*">
                <NotFound />
            </Route>
        </Switch>
    );
};

export default Routes;
