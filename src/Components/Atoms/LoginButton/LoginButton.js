import React, { useState } from 'react';
import { useAuth } from '../../../Hooks/useAuth';

const LoginButton = () => {
    const [email, setEmail] = useState('');
    const auth = useAuth();
    return (
        <>
            {auth.user === null ? (
                <>
                    <input type="text" value={email} onInput={(e) => setEmail(e.target.value)} />
                    <button onClick={() => auth.signin(email)}>Login</button>
                </>
            ) : (
                <button onClick={() => auth.signout()}>Logout</button>
            )}
        </>
    );
};

export default LoginButton;
