import React from 'react';
import logo from './iO_Logo_Alt.svg';
import './styles.scss';
import { useAuth } from '../../../Hooks/useAuth';
import { Redirect, Route } from 'react-router-dom';
import LoginButton from '../../Atoms/LoginButton/LoginButton';

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
                        <main>
                            <img className="ioLogo" src={logo} />
                            <h3>Welcome to the iO Academy aptitude test</h3>
                            <div>
                                <p>-WARNING-</p>
                                <p>Please do not refresh or move away from the page while you are taking the test.</p>
                                <p>If you dont stay on the page, the test will end and your score will be set to 0.</p>
                            </div>
                            <LoginButton />
                        </main>
                    )
                }
            />
        </>
    );
};

export default Login;
