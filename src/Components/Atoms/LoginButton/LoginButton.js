import React, { useState } from 'react';
import { useAuth } from '../../../Hooks/useAuth';

const LoginButton = () => {
    const [email, setEmail] = useState('');
    const [termsUnderstood, setTermsUnderstood] = useState(false);
    const auth = useAuth();
    return (
        <>
            {auth.user === null ? (
                <>
                    <h4>Please enter your email address</h4>
                    <input type="text" value={email} onInput={(e) => setEmail(e.target.value)} />
                    <button disabled={!termsUnderstood} onClick={() => auth.signin(email)}>
                        Login
                    </button>
                    <div>
                        Please check the box to confirm that you have read and understood the warning message
                        <input type="checkbox" onChange={() => setTermsUnderstood(!termsUnderstood)} />
                    </div>
                </>
            ) : (
                <button onClick={() => auth.signout()}>Logout</button>
            )}
        </>
    );
};

export default LoginButton;
