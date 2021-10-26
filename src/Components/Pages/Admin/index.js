import { useEffect, useState } from 'react';
import LoginButton from '../../Atoms/LoginButton/LoginButton';
import fetchApi from '../../../Hooks/useFetch';
import TableAccordion from './Accordion';
// This component is an example of displaying data from an API and keeping the front end up to date with any changes
// made to the data at the API in real time without needing to reload the page.
const Admin = () => {
    // initial state of all the users is null until it is populated by the API call
    const [users, setUsers] = useState(null);
    const [newUsers, setNewUsers] = useState(null);
    const [tests, setTests] = useState(null);

    // the use effect hook is passed a 2nd param of [], ensuring it only runs once when the component is first mounted
    useEffect(async () => {
        // common error: the code calling the API is often placed directly in here - abstracting it into its own
        // function (getUsers) is key to this pattern working
        await getUsers();
        await getTest();
        setNewUsers(users);
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
            // maps the users array to a temporary array with the value in user.test_id replaced with the name from the corresponding test
            let tempUsers = users.map((user) => {
                // filters the tests array based on if the test id matches the user test id
                let filteredTest = tests.filter((test) => {
                    return test.id === user.test_id;
                });
                user.test_id = filteredTest[0].name;
                return user;
            });
            // sets the array constructed in tempUsers to the variable newUsers
            setNewUsers(tempUsers);
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
                user.time = timeMinutes.toString() + 'm';
                return user;
            });
            setNewUsers(tempUsers2);
        }
    }, [users]);

    return (
        <>
            <LoginButton />
            <p>Admin page</p>
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'col'}>
                        {newUsers &&
                            newUsers.map((user) => {
                                return (
                                    <div key={user.id}>
                                        {user.name}
                                        <TableAccordion user={user} />
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Admin;
