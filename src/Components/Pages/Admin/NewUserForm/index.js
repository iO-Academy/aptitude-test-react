import React from 'react';
import { useEffect, useState } from 'react';
import fetchApi from '../../../../Hooks/useFetch';
import { useForm } from 'react-hook-form';
// import './NewUserForm.scss';

const NewUserHeading = () => {
    return (
        <div className="ms-auto">
            <h1>Add new user</h1>
        </div>
    );
};

const NewUserInput = (props) => {
    // Retrieving test types for user input dropdown.
    const [tests, setTests] = useState(null);
    const [user, setUser] = useState([]);
    const [value, setValue] = useState('default');

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
            feedback.className = 'feedback-div col-lg-10 me-auto alert alert-danger';
        } else {
            addUser(user);
            feedback.innerHTML = 'User successfully added.';
            feedback.className = 'feedback-div col-lg-10 me-auto alert alert-success';
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
        checkEmailAgainstDB(user.email, user);
    };

    /**
     * Form output for display on page (including front-end validation (...register) and content for dropdown menus).
     */
    return (
        <form onSubmit={handleSubmit(addUserHandler)} className="row">
            <div className="row gy-4">
                <div className="col-lg-6 form-group row me-auto">
                    <label className="col-form-label col-lg-1" htmlFor="name">
                        Name:
                    </label>
                    <div className="col-lg-11">
                        <input
                            className="form-control"
                            type="text"
                            name="name"
                            onChange={formChangeHandler}
                            placeholder="Sophie Moore"
                            {...register('name', {
                                required: true,
                                pattern: /^[a-zA-Z\u00C0-\u00FF\- ]*$/,
                                minLength: 1,
                            })}
                        />
                    </div>
                    {errors.name && <p>Please check the name</p>}
                </div>
                <div className="col-lg-6 form-group row ms-auto">
                    <label className="col-form-label col-lg-1" htmlFor="email">
                        Email:
                    </label>
                    <div className="col-lg-11">
                        <input
                            className="form-control"
                            type="text"
                            name="email"
                            onChange={formChangeHandler}
                            placeholder="sophie.moore@io-academy.uk"
                            {...register('email', {
                                required: true,
                                pattern:
                                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            })}
                        />
                    </div>
                    {errors.email && <p>Please enter a valid email</p>}
                </div>
            </div>
            <div className="row gy-4">
                <div className="col-lg-4 form-group row me-auto">
                    <label className="col-form-label col-lg-4" htmlFor="tests">
                        Assign to test:
                    </label>
                    <div className="col-lg-8">
                        <select
                            className="form-select"
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
                    </div>
                    {errors.tests && <p>Please select a test</p>}
                </div>
                <div className="col-lg-4 form-group row">
                    <label className="col-form-label col-lg-3" htmlFor="categories">
                        Category:
                    </label>
                    <div className="col-lg-9">
                        <select
                            className="form-select"
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
                    </div>
                    {errors.categories && <p>Please select a category</p>}
                </div>
                <div className="col-lg-4 form-group row ms-auto">
                    <label className="col-form-label col-lg-5" htmlFor="TestDuration">
                        Test duration (min/sec):
                    </label>
                    <div className="col-lg-3">
                        <input
                            className="form-control"
                            type="number"
                            id="minutes"
                            name="minutes"
                            max="60"
                            defaultValue="30"
                            {...register('minutes', { required: true, min: 0, max: 60 })}
                        />
                    </div>
                    {errors.minutes && <p>Please enter a value between 0 and 60</p>}
                    <div className="col-form-label col-lg-1">
                        <p>:</p>
                    </div>
                    <div className="col-lg-3">
                        <input
                            className="form-control"
                            type="number"
                            id="seconds"
                            name="seconds"
                            min="0"
                            max="60"
                            defaultValue="00"
                            {...register('seconds', { required: true, min: 0, max: 59 })}
                        />
                    </div>
                    {errors.seconds && <p>Please enter a value between 0 and 59</p>}
                </div>
            </div>
            <div className="row gy-2">
                <FeedbackMessage />
                <div className="col-lg-2">
                    <button className="float-end logoutBtn p-2" type="submit">
                        Add User
                    </button>
                </div>
            </div>
        </form>
    );
};

const FeedbackMessage = () => {
    return <div className="feedback-div col-lg-10 me-auto"></div>;
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
