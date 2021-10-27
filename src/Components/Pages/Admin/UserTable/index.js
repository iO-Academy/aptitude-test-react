import Table from 'react-bootstrap/Table';
import TableAccordion from '../Accordion';
import './style.css';
import React from 'react';
import { useEffect, useState } from 'react';
import getData from '../../../../Hooks/getData';

const UserTable = ({ users }) => {
    //initial state of the tests is null until tests is populated
    const [results, setResults] = useState(null);
    // the use effect hook is passed a 2nd param of [], ensuring it only runs once when the component is first mounted
    useEffect(async () => {
        // common error: the code calling the API is often placed directly in here - abstracting it into its own
        // function (getUsers) is key to this pattern working
        await setResults(await getData('result'));
    }, []);
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
        <Table className="table-light table-borderless mx-auto">
            <thead className="tableHead">
                <tr className="border-3 border-top-0 border-end-0 border-start-0">
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Percentage(%)</th>
                </tr>
            </thead>
            <tbody className="tableBody">
                {users.map((user) => {
                    return user.isAdmin === '1' ? (
                        <React.Fragment key={user.id + 'admin'}></React.Fragment>
                    ) : (
                        <React.Fragment key={user.id}>
                            <tr className="border-top" key={user.id}>
                                <td scope="row">{user.name}</td>
                                <td>{user.email}</td>
                                <td>{calcPercentage(user.id)}</td>
                            </tr>
                            <tr key={user.id + 'a'}>
                                <td colSpan={3}>
                                    <TableAccordion user={user} />
                                </td>
                            </tr>
                        </React.Fragment>
                    );
                })}
            </tbody>
        </Table>
    );
};

export default UserTable;
