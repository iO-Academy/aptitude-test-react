import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import fetchApi from '../../../../Hooks/useFetch';

const UserTable = (props) => {
    //initial state of the tests is null until tests is populated
    const [results, setResults] = useState(null);
    // the use effect hook is passed a 2nd param of [], ensuring it only runs once when the component is first mounted
    useEffect(async () => {
        // common error: the code calling the API is often placed directly in here - abstracting it into its own
        // function (getUsers) is key to this pattern working
        await getResults();
    }, []);
    const getResults = async () => {
        let response = await fetchApi(`result`);
        if (response.success) {
            return setResults(response.data);
        }
    };

    const calcPercentage = (id) => {
        if (results) {
            let potato = results.filter((result) => {
                return result.id === id;
            });
            if (potato.length !== 0) {
                return Math.round((potato[0].score / potato[0].testLength) * 100);
            } else {
                return 0;
            }
        }
    };

    return (
        <Table className="table mx-auto">
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Percentage(%)</th>
                </tr>
            </thead>
            <tbody>
                {props.users.map((user) => {
                    return (
                        <tr key={user.id}>
                            <td scope="row">{user.name}</td>
                            <td>{user.email}</td>
                            <td>{calcPercentage(user.id)}</td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
};

export default UserTable;
