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

    Object.filter = (obj, predicate) => Object.fromEntries(Object.entries(obj).filter(predicate));

    // the use effect hook is passed a 2nd param of [], ensuring it only runs once when the component is first mounted
    useEffect(async () => {
        // common error: the code calling the API is often placed directly in here - abstracting it into its own
        // function (getUsers) is key to this pattern working
        await getUsers();
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

    const [tests, setTests] = useState(null);

    useEffect(async () => {
        await getTest();
    }, []);
    const getTest = async () => {
        let response = await fetchApi(`test`);
        if (response.success) {
            return setTests(response.data);
        }
    };
    useEffect(() => {
        if (users && tests) {
            let tempUsers = [];
            users.forEach((user) => {
                let newUserObj = {};
                let userArray = Object.entries(user);
                userArray.forEach((value) => {
                    if (value[0] === 'test_id') {
                        tests.forEach((test) => {
                            if (value[1] === test.id) {
                                newUserObj.test_id = test.name;
                            }
                        });
                    } else {
                        newUserObj[value[0]] = value[1];
                    }
                });
                tempUsers.push(newUserObj);
            });
            setNewUsers(tempUsers);
        }
    }, [users, tests]);

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
