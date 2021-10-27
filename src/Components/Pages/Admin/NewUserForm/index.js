import React from 'react';
import { useEffect, useState } from 'react';
import fetchApi from '../../../../Hooks/useFetch';
import { useForm } from 'react-hook-form';

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
    // Retrieves all email addresses from database
    const [users, setUsers] = useState(null);
    useEffect(async () => {
        await getEmails();
    }, []);
    const getEmails = async () => {
        let response = await fetchApi(`user`);
        if (response.success) {
            return setUsers(response.data);
        }
    };
    /**
     * Creating array of existing emails from db for validation against new user entry.
     */
    let emails =
        users &&
        users.map((user) => {
            return user.email;
        });
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
     * Checking new email against database
     */
    const checkEmailAgainstDB = (email, user) => {
        let feedback = document.querySelector('.feedback-div');
        if (emails.includes(email)) {
            feedback.innerHTML =
                'Email already registered. Please check if user already exists or provide alternative email.';
        } else {
            addUser(user);
            feedback.innerHTML = 'User successfully added.';
            // Resets form upon successful submission
            reset();
        }
    };
    /**
     * Destructuring React Hook Form for use within this component
     */
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    /**
     * Handles the submit button action
     */
    const addUserHandler = (user, ev) => {
        ev.preventDefault();

        const time = timeInSeconds(
            +document.querySelector('#minutes').value,
            +document.querySelector('#seconds').value,
        );
        user['time'] = time;
        console.log(user); // for debugging
        checkEmailAgainstDB(user.email, user);
    };
    /**
     * Form output for display on page (including front-end validation (...register) and content for dropdown menus).
     */
    return (
        <form onSubmit={handleSubmit(addUserHandler)}>
            <div>
                <input
                    type="text"
                    name="name"
                    onChange={formChangeHandler}
                    placeholder="Type new user's name"
                    {...register('name', { required: true, pattern: /^[a-zA-Z\u00C0-\u00FF\- ]*$/, minLength: 1 })}
                />
                {errors.name && <p>Please check the name</p>}
            </div>
            <div>
                <input
                    type="text"
                    name="email"
                    onChange={formChangeHandler}
                    placeholder="Type new user's email"
                    {...register('email', {
                        required: true,
                        pattern:
                            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    })}
                />
                {errors.email && <p>Please enter a valid email</p>}
            </div>
            <div>
                <label htmlFor="tests">Assign to test:</label>
                <select
                    id="tests"
                    name="test_id"
                    defaultValue=""
                    onChange={formChangeHandler}
                    {...register('tests', { required: true })}
                >
                    <option value="" disabled hidden>
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
                {errors.tests && <p>Please select a test</p>}
            </div>
            <div>
                <label htmlFor="categories">Category:</label>
                <select
                    id="categories"
                    name="category_id"
                    defaultValue=""
                    onChange={formChangeHandler}
                    {...register('categories', { required: true })}
                >
                    <option value="" disabled hidden>
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
                {errors.categories && <p>Please select a category</p>}
            </div>
            <div>
                <label htmlFor="TestDuration">Test duration (min/sec):</label>
                <input
                    type="number"
                    id="minutes"
                    name="minutes"
                    max="60"
                    defaultValue="30"
                    {...register('minutes', { required: true, min: 0, max: 60 })}
                />
                {errors.minutes && <p>Please enter a value between 0 and 60</p>}
                <input
                    type="number"
                    id="seconds"
                    name="seconds"
                    min="0"
                    max="60"
                    defaultValue="00"
                    {...register('seconds', { required: true, min: 0, max: 59 })}
                />
                {errors.seconds && <p>Please enter a value between 0 and 59</p>}
            </div>
            <div>
                <button type="submit">Add User</button>
            </div>
        </form>
    );
};

const FeedbackMessage = () => {
    return <div className="feedback-div"></div>;
};

const NewUserForm = () => {
    return (
        <div>
            <NewUserHeading />
            <NewUserInput />
            <FeedbackMessage />
        </div>
    );
};

export default NewUserForm;
