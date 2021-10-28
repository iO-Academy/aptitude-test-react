import Dropdown from 'react-bootstrap/Dropdown';
import './style.css';
import UserTable from '../UserTable';
import { useEffect, useState } from 'react';

const TableFilter = (props) => {
    //initial state of filtered users is props.users
    const [filteredUsers, setFilteredUsers] = useState(props.users);
    //initial state of userTable is null
    const [userTable, setUserTable] = useState('null');
    const [filterToggleName, setFilterToggleName] = useState('Category');
    let filteredUsersArray = [];

    //When the state of filteredUsers changes update the users prop within the UserTable to contain the new filteredUsers
    useEffect(() => {
        filteredUsers ? setUserTable(<UserTable users={filteredUsers} />) : '';
    }, [filteredUsers]);

    return (
        <div>
            <h5>Filter Results</h5>
            <Dropdown className="my-3">
                <Dropdown.Toggle className="btn dropdown-toggle" type="button">
                    {filterToggleName}
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    {props.categories.map((category) => {
                        return (
                            <Dropdown.Item
                                key={category.id}
                                href="#"
                                onClick={() => {
                                    setFilterToggleName(category.name);
                                    props.users.map((user) => {
                                        return user.category_name === category.name
                                            ? filteredUsersArray.push(user)
                                            : '';
                                    });
                                    return setFilteredUsers(filteredUsersArray);
                                }}
                            >
                                {category.name}
                            </Dropdown.Item>
                        );
                    })}
                    <Dropdown.Item
                        onClick={() => {
                            setFilteredUsers(props.users);
                        }}
                    >
                        None
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            {userTable}
        </div>
    );
};

export default TableFilter;
