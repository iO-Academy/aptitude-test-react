import React from 'react';
import { useAuth } from '../../../Hooks/useAuth';

const LoginButton: React.FC = () => {
    const auth = useAuth();
    return (
        <>
            {auth.user === null ? (
                <button onClick={() => auth.signin()}>Login</button>
            ) : (
                <button onClick={() => auth.signout()}>Logout</button>
            )}
        </>
    );
};

export default LoginButton;
