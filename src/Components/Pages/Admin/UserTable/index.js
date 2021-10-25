import Table from 'react-bootstrap/Table';

const UserTable = (props) => {
    return (
        <Table className="table striped">
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                </tr>
            </thead>
            <tbody>
                {props.users.map((user) => {
                    return (
                        <tr key={user.id}>
                            <td scope="row">{user.name}</td>
                            <td>{user.email}</td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
};

export default UserTable;
