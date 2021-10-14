import { Switch, Route } from 'react-router-dom';
import Login from '../Components/Pages/Login';
import Admin from '../Components/Pages/Admin';
import NotFound from '../Components/Pages/NotFound/NotFound';
import PrivateRoute from '../Components/Utilities/PrivateRoute';
import Exam from '../Components/Pages/Exam';
import AdminRoute from '../Components/Utilities/AdminRoute';

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/">
                <Login />
            </Route>
            <AdminRoute path="/admin">
                <Admin />
            </AdminRoute>
            <PrivateRoute path="/exam">
                <Exam />
            </PrivateRoute>
            <Route path="*">
                <NotFound />
            </Route>
        </Switch>
    );
};

export default Routes;
