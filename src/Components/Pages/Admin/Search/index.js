import React from 'react';
import { useEffect, useState } from 'react';
import fetchApi from '../../../../Hooks/useFetch';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Fuse from 'fuse.js';

const Search = () => {
    const [users, setUsers] = useState([]);
    const [query, updateQuery] = useState('');

    useEffect(async () => {
        getUsers();
    }, []);

    const getUsers = async () => {
        let response = await fetchApi(`user`);
        if (response.success) {
            return setUsers(response.data);
        }
    };

    /**
     * For info on fuse options see: https://fusejs.io/api/options.html
     * Threshold can have a value of 0-1, with 0 being an exact match (including case).
     * includeScore outputs how close the match is (for debugging purposes), with 0 being a exact match.
     * minMatchCharLength is the amount of chars required before fuse returns results.
     * Please feel free to tweak and add options.
     */
    const fuseoptions = {
        keys: ['name', 'email'],
        includeScore: true,
        threshold: 0.04,
        minMatchCharLength: 2,
    };

    const fuse = new Fuse(users, fuseoptions);

    const searchHandler = (event) => {
        updateQuery(event.target.value);
        // Currently outputting results to console, use the output to wire up the DOM.
        const results = fuse.search(query);
        console.log(results);
    };

    const resetHandler = () => {
        updateQuery('');
    };

    return (
        <Form className="d-flex w-100">
            <Form.Control
                type="search"
                value={query}
                onChange={searchHandler}
                placeholder="Search"
                className="me-2"
                aria-label="Search"
            />
            <Button
                as="input"
                type="reset"
                value="Clear"
                variant="outline-primary"
                className="me-2"
                onClick={resetHandler}
            />
        </Form>
    );
};

export default Search;
