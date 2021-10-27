import { useEffect, useState } from 'react';
import LoginButton from '../../Atoms/LoginButton/LoginButton';
import fetchApi from '../../../Hooks/useFetch';
import useJoin from '../../../Hooks/useJoin';
import UserTable from './UserTable';
import './style.css';

// This component is an example of displaying data from an API and keeping the front end up to date with any changes
// made to the data at the API in real time without needing to reload the page.
const Admin = () => {
    // initial state of all the users is null until it is populated by the API call
    const [users, setUsers] = useState(null);
    const [editedUsers, setEditedUsers] = useState(null);
    const [tests, setTests] = useState(null);
    //initial state of the table is null until users is populated
    const [table, setTable] = useState(null);
    // the use effect hook is passed a 2nd param of [], ensuring it only runs once when the component is first mounted
    useEffect(async () => {
        // common error: the code calling the API is often placed directly in here - abstracting it into its own
        // function (getUsers) is key to this pattern working
        await getUsers();
        await getTest();
        setEditedUsers(users);
    }, []);

    // because it is abstracted here we have control when it occurs - once when component first mounted then whenever
    // we choose from that point onwards, thus no infinite recalling.
    const getUsers = async () => {
        let response = await fetchApi(`user`);
        if (response.success) {
            return setUsers(response.data);
        }
    };

    // because it is abstracted here we have control when it occurs - once when component first mounted then whenever
    // we choose from that point onwards, thus no infinite recalling.
    const getTest = async () => {
        let response = await fetchApi(`test`);
        if (response.success) {
            return setTests(response.data);
        }
    };
    // this code replaces the value in user.testID for each user with the test name from the test with a matching ID
    useEffect(() => {
        if (users && tests) {
            setEditedUsers(useJoin([users, 'test_id', 'testName'], [tests, 'id', 'name']));
        }
    }, [users, tests]);

    // replaces the binary value of showTimer with yes/no and converts the value of time to minutes
    useEffect(() => {
        if (users) {
            // Timer Hidden
            let tempUsers1 = users.map((user) => {
                if (user.showTimer === '1') {
                    user.showTimer = 'yes';
                } else {
                    user.showTimer = 'no';
                }
                return user;
            });
            // Timer Allowed
            let tempUsers2 = tempUsers1.map((user) => {
                let timeMinutes = parseInt(user.time) / 60;
                user.time = timeMinutes.toString();
                return user;
            });
            setEditedUsers(tempUsers2);
        }
    }, [users]);
    useEffect(() => {
        users ? setTable(<UserTable users={editedUsers} />) : '';
    }, [editedUsers]);

    return (
        <div className="adminPage p-3">
            <div className="container">
                <h1 className="adminh1">Admin page</h1>
                {table}
                <LoginButton />
            </div>
        </div>
    );
};

export default Admin;
