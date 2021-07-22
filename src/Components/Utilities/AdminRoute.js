import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../../Hooks/useAuth';

export default function AdminRoute({ children, ...rest }) {
    const auth = useAuth();

    return (
        <>
            <Route
                {...rest}
                render={({ location }) =>
                    auth.user != null && auth.user.isAdmin === '1' ? (
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
