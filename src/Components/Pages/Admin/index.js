import { useEffect, useState } from 'react';
import LoginButton from '../../Atoms/LoginButton/LoginButton';
import NewUserForm from './NewUserForm';
import Search from './Search';
import useJoin from '../../../Hooks/useJoin';
import TableFilter from './TableFilter';
import useGetData from '../../../Hooks/useGetData';
import './style.css';
import UserTable from './UserTable';

const Admin = () => {
    // initial state of all the users is null until it is populated by the API call
    const [users, setUsers] = useState([]);
    const [tests, setTests] = useState(null);
    const [results, setResults] = useState(null);
    const [categories, setCategories] = useState([]);
    const [filteredCategory, setFilteredCategory] = useState('all');
    const [searchResultUsers, setSearchResultUsers] = useState([]);

    // the use effect hook is passed a 2nd param of [], ensuring it only runs once when the component is first mounted
    useEffect(async () => {
        // common error: the code calling the API is often placed directly in here - abstracting it into its own
        // function (getUsers) is key to this pattern working
        setUsers(await useGetData('user'));
        setTests(await useGetData('test'));
        setResults(await useGetData('result'));
        setCategories(await useGetData('category'));
    }, []);

    // this code replaces the value in user.testID for each user with the test name from the test with a matching ID
    useEffect(() => {
        if (users && tests && results) {
            useJoin([users, 'test_id', 'testName'], [tests, 'id', 'name']);
            useJoin([users, 'id', 'testLength'], [results, 'id', 'testLength']);
        }
    }, [users, tests, results]);

    /**
     * Handles the search result state update depending on search results returned
     * @param searchResult
     */
    const searchChangeHandler = (searchResult) => {
        // Check if there are meaningful results, otherwise set search result to empty
        if (searchResult.length > 0) {
            setSearchResultUsers(searchResult);
        } else {
            setSearchResultUsers([]);
        }
    };

    const addedUserHandler = () => {
        const getAllUsers = async () => {
            setUsers(await useGetData('user'));
        };
        getAllUsers();
    };

    /**
     * Handles the change of filter selection by updating the state to trigger render
     * @param selectedCategory
     */
    const filterChangeHandler = (selectedCategory) => {
        setFilteredCategory(selectedCategory);
    };

    /**
     * Returns the filtered or unfiltered object of users, based on search and filter results.
     * The users are first filtered by search result and then again by filter.
     * @type {*[]}
     */
    const filteredUsers = users
        .filter((user) => {
            return searchResultUsers.length > 0 ? searchResultUsers.indexOf(user) !== -1 : users;
        })
        .filter((user) => {
            return filteredCategory === 'all' ? users : user.category_id === filteredCategory;
        });

    return (
        <div className="adminPage p-3">
            <div className="container">
                <h1 className="adminh1">Admin page</h1>
                <NewUserForm onUserAdded={addedUserHandler} />
                {/*<NewUserForm tests={tests} categories={categories} onUserAdded={addedUserHandler} />*/}
                <Search users={users} onSearchChange={searchChangeHandler} />
                <TableFilter categories={categories} onFilterChange={filterChangeHandler} />
                <UserTable users={filteredUsers} />
                <LoginButton />
            </div>
        </div>
    );
};

export default Admin;
