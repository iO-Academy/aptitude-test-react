import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Search = () => {
    const searchHandler = () => {};

    return (
        <Form className="d-flex w-50" onSubmit={searchHandler}>
            <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />
            <Button as="input" type="submit" value="Search" variant="outline-primary" className="me-2" />
            <Button as="input" type="reset" value="Clear" variant="outline-primary" className="me-2" />
        </Form>
    );
};

export default Search;
