import { useEffect, useState } from 'react';
import LoginButton from '../../Atoms/LoginButton/LoginButton';
import NewUserForm from './NewUserForm';
import Search from './Search';
import useJoin from '../../../Hooks/useJoin';
import TableFilter from './TableFilter';
import useGetData from '../../../Hooks/useGetData';
import './style.css';

const Admin = () => {
    // initial state of all the users is null until it is populated by the API call
    const [users, setUsers] = useState([]);
    const [editedUsers, setEditedUsers] = useState([]);
    const [tests, setTests] = useState(null);
    const [results, setResults] = useState(null);
    //initial state of the table is null until users is populated
    const [tableFilter, setTableFilter] = useState(null);
    const [categories, setCategories] = useState([]);

    // the use effect hook is passed a 2nd param of [], ensuring it only runs once when the component is first mounted
    useEffect(async () => {
        // common error: the code calling the API is often placed directly in here - abstracting it into its own
        // function (getUsers) is key to this pattern working
        setUsers(await useGetData('user'));
        setTests(await useGetData('test'));
        setResults(await useGetData('result'));
        setEditedUsers(users);
        setCategories(await useGetData('category'));
    }, []);
    // this code replaces the value in user.testID for each user with the test name from the test with a matching ID

    useEffect(() => {
        if (users && tests && results) {
            let editingUsers = useJoin([users, 'test_id', 'testName'], [tests, 'id', 'name']);
            setEditedUsers(useJoin([editingUsers, 'id', 'testLength'], [results, 'id', 'testLength']));
            // useJoin([editingUsers, 'id', 'testLength'], [results, 'id', 'testLength']);
        }
    }, [users, tests, results]);

    // useEffect(() => {
    //     editedUsers && categories !== null
    //         ? setTableFilter(<TableFilter users={editedUsers} categories={categories} />)
    //         : '';
    // }, [editedUsers, categories]);

    /**
     * Handles the users' state update depending on search results returned
     * @param searchResult
     */
    const searchChangeHandler = (searchResult) => {
        // Check if there are meaningful results, otherwise update state with all users again
        if (searchResult.length > 0) {
            setUsers(searchResult);
        } else {
            const getAllUsers = async () => {
                setUsers(await useGetData('user'));
            };
            getAllUsers();
        }
    };

    const userAddedHandler = () => {
        const getAllUsers = async () => {
            setUsers(await useGetData('user'));
        };
        getAllUsers();
    };

    return (
        <div className="adminPage p-3">
            <div className="container">
                <h1 className="adminh1">Admin page</h1>
                <NewUserForm onUserAdded={userAddedHandler} />
                <Search users={users} onSearchChange={searchChangeHandler} />
                <TableFilter users={users} categories={categories} />
                {/*{tableFilter}*/}
                <LoginButton />
            </div>
        </div>
    );
};

export default Admin;
