import Dropdown from 'react-bootstrap/Dropdown';
import DropdownItems from './DropdownItems';
import { useEffect, useState } from 'react';
import useGetData from '../../../../Hooks/useGetData';
import './style.css';
import UserTable from '../UserTable';

const TableFilter = (props) => {
    const [categories, setCategories] = useState('null');
    const [dropdownItems, setDropdownItems] = useState(null);
    const [tableFilter, setTableFilter] = useState(null);

    useEffect(async () => {
        await setCategories(await useGetData('category'));
    }, []);

    useEffect(() => {
        categories ? setDropdownItems(<DropdownItems categories={categories} />) : '';
    }, [categories]);

    return (
        <div>
            <h5>Filter Results</h5>
            <Dropdown className="my-3">
                <Dropdown.Toggle className="btn dropdown-toggle" type="button">
                    Category
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    {dropdownItems}
                    <Dropdown.Item>None</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <UserTable users={props.users} />
        </div>
    );
};

export default TableFilter;
