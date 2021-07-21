import { Redirect, Route } from 'react-router-dom';
import { ReactNode } from 'react';
import { useAuth } from '../../Hooks/useAuth';

interface Props {
    children: ReactNode;
    path: string;
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
export default function PrivateRoute({ children, ...rest }: Props) {
    const auth = useAuth();
    return (
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
    );
}
