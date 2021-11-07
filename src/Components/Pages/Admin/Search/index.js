import React from 'react';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Fuse from 'fuse.js';
import './style.css';

const Search = (props) => {
    const [query, setQuery] = useState('');

    /**
     * For info on fuse options see: https://fusejs.io/api/options.html
     * Threshold can have a value of 0-1, with 0 being an exact match (including case).
     * includeScore outputs how close the match is (for debugging purposes), with 0 being an exact match.
     * minMatchCharLength is the amount of chars required before fuse returns results.
     * Please feel free to tweak and add options.
     */
    const fuseoptions = {
        keys: ['name', 'email'],
        includeScore: true,
        threshold: 0.04,
        minMatchCharLength: 2,
    };

    const fuse = new Fuse(props.users, fuseoptions);
    const results = fuse.search(query);
    const searchResult = query ? results.map((user) => user.item) : {};

    function searchHandler({ currentTarget }) {
        setQuery(currentTarget.value);
        props.onSearchChange(searchResult);
    }

    const resetHandler = () => {
        setQuery('');
        props.onSearchChange({});
    };

    return (
        <>
            <h5>Search</h5>
            <Form className="d-flex mb-3 mt-3">
                <Form.Control
                    type="search"
                    value={query}
                    onChange={searchHandler}
                    onReset={resetHandler}
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                />
                <Button
                    as="input"
                    type="reset"
                    value="Clear"
                    className="float-end logoutBtn p-2"
                    onClick={resetHandler}
                />
            </Form>
        </>
    );
};

export default Search;