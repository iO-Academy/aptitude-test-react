import Table from 'react-bootstrap/Table';
import TableAccordion from '../Accordion';
import './style.css';

const UserTable = (props) => {
    console.log(props.users);
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
                    return (
                        <>
                            <tr className="border-top">
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                            </tr>
                            <tr>
                                <td colSpan={3}>
                                    <TableAccordion user={user} />
                                </td>
                            </tr>
                        </>
                    );
                })}
            </tbody>
        </Table>
    );
};

export default UserTable;
