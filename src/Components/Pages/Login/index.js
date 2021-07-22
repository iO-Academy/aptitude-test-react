import React from 'react';
import { useAuth } from '../../../Hooks/useAuth';
import { Redirect, Route } from 'react-router-dom';

const Login = () => {
    const auth = useAuth();

    let path = '/';

    if (auth.user != null && auth.user.isAdmin === '1') {
        path = '/admin';
    }

    if (auth.user != null && auth.user.isAdmin === '0') {
        path = '/exam';
    }

    return (
        <>
            <Route
                render={({ location }) =>
                    auth.user ? (
                        <Redirect
                            to={{
                                pathname: path,
                                state: { from: location },
                            }}
                        />
                    ) : (
                        <p>Login Page</p>
                    )
                }
            />
        </>
    );
};

export default Login;
