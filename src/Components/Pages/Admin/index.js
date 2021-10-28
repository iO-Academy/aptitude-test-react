import { useEffect, useState } from 'react';
import LoginButton from '../../Atoms/LoginButton/LoginButton';
import fetchApi from '../../../Hooks/useFetch';
import NewUserForm from './NewUserForm';
import Search from './Search';
import useJoin from '../../../Hooks/useJoin';
import UserTable from './UserTable';
import './style.css';

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [tests, setTests] = useState([]);

    /**
     * Retrieves all users from db
     * @returns {Promise<void>}
     */
    const getUsers = async () => {
        let response = await fetchApi(`user`);
        if (response.success) {
            return setUsers(response.data);
        }
    };

    /**
     * Retrieves all tests from db
     * @returns {Promise<void>}
     */
    const getTest = async () => {
        let response = await fetchApi(`test`);
        if (response.success) {
            return setTests(response.data);
        }
    };

    useEffect(async () => {
        getUsers();
        getTest();
    }, []);

    useJoin([users, 'test_id', 'testName'], [tests, 'id', 'name']);

    /**
     * Handles the users' state update depending on search results returned
     * @param searchResult
     */
    const searchChangeHandler = (searchResult) => {
        // Check if there are meaningful results, otherwise update state with all users again
        if (searchResult.length > 0) {
            setUsers(searchResult);
        } else {
            getUsers();
        }
    };

    return (
        <>
            <LoginButton />
            <NewUserForm />
            <Search users={users} onSearchChange={searchChangeHandler} />
            <UserTable users={users} />
        </>
    );
};

export default Admin;
