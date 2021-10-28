import React from 'react';
import { useEffect, useState } from 'react';
import fetchApi from '../../../../Hooks/useFetch';

const NewUserHeading = () => {
    return <h2>Add new user</h2>;
};

const NewUserInput = () => {
    // Retrieving test types for user input dropdown.
    const [tests, setTests] = useState(null);
    useEffect(async () => {
        await getTests();
    }, []);
    const getTests = async () => {
        let response = await fetchApi(`test`);
        if (response.success) {
            return setTests(response.data);
        }
    };
    // Retrieving category types for user input dropdown.
    const [categories, setCategories] = useState(null);
    useEffect(async () => {
        await getCategories();
    }, []);
    const getCategories = async () => {
        let response = await fetchApi(`category`);
        if (response.success) {
            return setCategories(response.data);
        }
    };

    const [user, setUser] = useState([]);
    const [value, setValue] = useState('default');

    /**
     * Calculates total seconds
     */
    const timeInSeconds = (minutes, seconds) => {
        return minutes * 60 + seconds;
    };

    /**
     * Handles changes to form components
     */
    const formChangeHandler = (event) => {
        setUser((user) => ({
            ...user,
            [event.target.name]: event.target.value,
        }));

        setValue(event.target.value);
    };

    /**
     * Adds the user object to the database
     */
    const addUser = async (user) => {
        let response = await fetchApi(`user`, {
            method: 'POST',
            header: { 'Content-Type': 'application/json' },
            body: user,
        });
    };

    /**
     * Handles the submit button action
     */
    const addUserHandler = (ev) => {
        ev.preventDefault();

        const time = timeInSeconds(
            +document.querySelector('#minutes').value,
            +document.querySelector('#seconds').value,
        );
        user['time'] = time;

        console.log(user); // for debugging
        addUser(user);
    };

    return (
        <form className="text-center" onSubmit={addUserHandler}>
            <div>
                <input type="text" name="name" onChange={formChangeHandler} placeholder="Type new user's name" />
                <input type="email" name="email" onChange={formChangeHandler} placeholder="Type new user's email" />
            </div>
            <div>
                <label htmlFor="tests" className="mx-2">
                    Assign to test:
                </label>
                <select id="tests" name="test_id" defaultValue="default" onChange={formChangeHandler}>
                    <option value="default" disabled hidden>
                        Select...
                    </option>
                    {/*Mapping tests to option values for dropdown*/}
                    {tests &&
                        tests.map((test) => {
                            return (
                                <option key={test.id} value={test.id}>
                                    {test.name}
                                </option>
                            );
                        })}
                </select>
                <label htmlFor="categories" className="mx-2">
                    Category:
                </label>
                <select id="categories" name="category_id" defaultValue="default" onChange={formChangeHandler}>
                    <option value="default" disabled hidden>
                        Select...
                    </option>
                    {/*Mapping categories to option values for dropdown*/}
                    {categories &&
                        categories.map((category) => {
                            return (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            );
                        })}
                </select>
            </div>
            <div>
                <label htmlFor="TestDuration">Test duration (min/sec):</label>
                <input type="number" id="minutes" name="minutes" max="60" />
                <input type="number" id="seconds" name="seconds" min="0" max="60" />
            </div>
            <button type="submit" className="adminButton p-2 my-2">
                Add User
            </button>
        </form>
    );
};

const NewUserForm = () => {
    return (
        <div>
            <NewUserHeading />
            <NewUserInput />
        </div>
    );
};

export default NewUserForm;
