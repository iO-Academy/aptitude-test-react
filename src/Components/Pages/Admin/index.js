import { useEffect, useState } from 'react';
import LoginButton from '../../Atoms/LoginButton/LoginButton';
import fetchApi from '../../../Hooks/useFetch';
import UserTable from './UserTable';

// This component is an example of displaying data from an API and keeping the front end up to date with any changes
// made to the data at the API in real time without needing to reload the page.
const Admin = () => {
    // initial state of all the users is null until it is populated by the API call
    const [users, setUsers] = useState(null);
    //initial state of the table is null until users is populated
    const [table, setTable] = useState(null);
    //initial state of the tests is null until tests is populated
    const [tests, setTest] = useState(null);

    // the use effect hook is passed a 2nd param of [], ensuring it only runs once when the component is first mounted
    useEffect(async () => {
        // common error: the code calling the API is often placed directly in here - abstracting it into its own
        // function (getUsers) is key to this pattern working
        await getUsers();
        await getTests();
    }, []);

    useEffect(() => {
        tests ? getQuestions(tests) : '';
    }, [tests]);

    // because it is abstracted here we have control when it occurs - once when component first mounted then whenever
    // we choose from that point onwards, thus no infinite recalling.
    const getUsers = async () => {
        let response = await fetchApi(`user`);
        if (response.success) {
            return setUsers(response.data);
        }
    };

    const getTests = async () => {
        let response = await fetchApi(`test`);
        if (response.success) {
            return setTest(response.data);
        }
    };

    const getQuestions = (tests) => {
        if (tests) {
            tests.forEach(async (test) => {
                let response = await fetchApi(`question?test_id=${test.id}`);
                if (response.success) {
                    totalScores.push(response.data.length);
                }
            });
        }
    };

    let totalScores = [];

    useEffect(() => {
        users ? setTable(<UserTable users={users} />) : '';
    }, [users]);

    return (
        <div className="container">
            <h1>Admin page</h1>
            {table}
            <LoginButton />
        </div>
    );
};

export default Admin;
