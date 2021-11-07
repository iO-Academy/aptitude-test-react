import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import './style.css';

const TableFilter = (props) => {
    const [filterSelected, setFilterSelected] = useState('Category');

    const catChangeHandler = (eventKey, event) => {
        setFilterSelected(event.target.textContent);
        props.onFilterChange(eventKey);
    };

    return (
        <>
            <h5>Filter</h5>
            <Dropdown className="my-3" onSelect={catChangeHandler}>
                <Dropdown.Toggle className="btn dropdown-toggle" type="button">
                    {filterSelected}
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <Dropdown.Item eventKey="all">All</Dropdown.Item>
                    {props.categories.map((category) => {
                        // eslint-disable-next-line react/jsx-key
                        return <Dropdown.Item eventKey={category.id}>{category.name}</Dropdown.Item>;
                    })}
                </Dropdown.Menu>
            </Dropdown>
        </>
    );
};

export default TableFilter;
