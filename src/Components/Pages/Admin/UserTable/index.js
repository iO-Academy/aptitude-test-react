import Table from 'react-bootstrap/Table';
import TableAccordion from '../Accordion';
import './style.css';
import React from 'react';

const UserTable = (props) => {
    return (
        <Table className="table-light table-borderless mx-auto">
            <thead className="tableHead">
                <tr className="border-3 border-top-0 border-end-0 border-start-0">
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                </tr>
            </thead>
            <tbody className="tableBody">
                {props.users.map((user) => {
                    return user.isAdmin === '1' ? (
                        <></>
                    ) : (
                        <React.Fragment key={user.id}>
                            <tr className="border-top" key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
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
