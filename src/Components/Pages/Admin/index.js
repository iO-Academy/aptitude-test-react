import { useEffect, useState } from 'react';
import LoginButton from '../../Atoms/LoginButton/LoginButton';
import fetchApi from '../../../Hooks/useFetch';

// This component is an example of displaying data from an API and keeping the front end up to date with any changes
// made to the data at the API in real time without needing to reload the page.
const Admin = () => {
    // initial state of all the users is null until it is populated by the API call
    const [users, setUsers] = useState(null);

    // the use effect hook is passed a 2nd param of [], ensuring it only runs once when the component is first mounted
    useEffect(async () => {
        // common error: the code calling the API is often placed directly in here - abstracting it into its own
        // function (getUsers) is key to this pattern working
        getUsers();
    }, []);

    // because it is abstracted here we have control when it occurs - once when component first mounted then whenever
    // we choose from that point onwards, thus no infinite recalling.
    const getUsers = async () => {
        let response = await fetchApi(`user`);
        if (response.success) {
            return setUsers(response.data);
        }
    };

    console.log(users);

    return (
        <>
            <LoginButton />
            <p>Admin page</p>
            {/*{users &&*/}
            {/*    users.map((user) => {*/}
            {/*        return <p key={user.id}>{user.name}</p>;*/}
            {/*    })}*/}
            <table>
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users &&
                        users.map((user) => {
                            return (
                                <tr key={user.id}>
                                    <td scope="row">{user.name}</td>
                                    <td>{user.email}</td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </>
    );
};

export default Admin;
