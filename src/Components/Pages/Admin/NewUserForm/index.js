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
    return (
        <form>
            <div>
                <input type="text" placeholder="Type new user's name" />
            </div>
            <div>
                <input type="email" placeholder="Type new user's email" />
            </div>
            <div>
                <label htmlFor="tests">Assign to test:</label>
                <select id="tests" name="tests">
                    {/*Mapping tests to option values for dropdown*/}
                    {tests &&
                        tests.map((test) => {
                            return (
                                <option key={test.id} value={test.name}>
                                    {test.name}
                                </option>
                            );
                        })}
                </select>
            </div>
            <div>
                <label htmlFor="categories">Category:</label>
                <select id="categories" name="categories">
                    {/*Mapping categories to option values for dropdown*/}
                    {categories &&
                        categories.map((category) => {
                            return (
                                <option key={category.id} value={category.name}>
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
            <div>
                <button type="button">Add User</button>
            </div>
        </form>
    );
};

const NewUserForm = () => {
    return (
        <div className="">
            <NewUserHeading />
            <NewUserInput />
        </div>
    );
};

export default NewUserForm;
