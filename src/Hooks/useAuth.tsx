import { useState, useContext, createContext, ReactNode } from 'react';

interface UserContext {
    user: string | null;
    signin(): any;
    signout(): any;
}

const authContext = createContext<UserContext>({} as UserContext);

type Props = {
    children: ReactNode;
};

// Provider component that wraps the app and makes auth object ...
// ... available to any child component that calls useAuth().
export const ProvideAuth = ({ children }: Props) => {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
    return useContext(authContext);
};

function useProvideAuth() {
    const [user, setUser] = useState<string | null>(null);

    const signin = (): void => {
        return setUser('user');
    };

    const signout = (): void => {
        return setUser(null);
    };

    return {
        user,
        signin,
        signout,
    };
}
