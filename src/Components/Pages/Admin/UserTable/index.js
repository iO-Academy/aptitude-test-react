import Table from 'react-bootstrap/Table';
import TableAccordion from '../Accordion';

const UserTable = (props) => {
    console.log(props.users);
    return (
        <Table className="table mx-auto">
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                </tr>
            </thead>
            <tbody>
                {props.users.map((user) => {
                    return (
                        <>
                            <tr>
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
