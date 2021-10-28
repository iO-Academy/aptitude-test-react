import { useState, useContext, createContext } from 'react';
import fetchApi from './useFetch';

const authContext = createContext({});

// Provider component that wraps the app and makes auth object ...
// ... available to any child component that calls useAuth().
export const ProvideAuth = ({ children }) => {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
    return useContext(authContext);
};

function useProvideAuth() {
    const [user, setUser] = useState(null);

    const signin = async (url) => {
        if (url === '') return;
        let response = await fetchApi(`user?email=${url}`);
        if (response.success) {
            if (response.data.canRetake === '1' || response.data.isAdmin === '1') {
                return setUser(response.data);
            }
        }
    };

    const signout = () => {
        return setUser(null);
    };

    return {
        user,
        signin,
        signout,
    };
}
