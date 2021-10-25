import React, { useState } from 'react';
import fetchApi from '../../../../Hooks/useFetch';

const NewUserHeading = () => {
    return <h2>Add new user</h2>;
};

const addUser = async (user) => {
    let response = await fetchApi(`user`, {
        method: 'POST',
        header: { 'Content-Type': 'application/json' },
        body: user,
    });
};

const addUserHandler = (event) => {
    const user = {
        email: 'example@email.com',
        name: 'Henri Smith',
        time: '1800',
        test_id: '1',
        category_id: '1',
    };
    event.preventDefault();
    addUser(user);
};

function Button(props) {
    return null;
}

function Input(props) {
    return null;
}

const NewUserForm = () => {
    return (
        <div>
            <NewUserHeading />
            <button type="button" onClick={addUserHandler}>
                Add User
            </button>
        </div>
    );
};

export default NewUserForm;
