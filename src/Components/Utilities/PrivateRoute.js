import { Redirect, Route, useHistory } from 'react-router-dom';
import { useAuth } from '../../Hooks/useAuth';

export default function PrivateRoute({ children, ...rest }) {
    const auth = useAuth();

    return (
        <>
            <Route
                {...rest}
                render={({ location }) =>
                    auth.user ? (
                        children
                    ) : (
                        <Redirect
                            to={{
                                pathname: '/',
                                state: { from: location },
                            }}
                        />
                    )
                }
            />
        </>
    );
}
