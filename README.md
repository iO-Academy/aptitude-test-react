# Aptitude Test

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). There are some 
great additional docs [here](https://create-react-app.dev/) too

This application requires [this API](https://github.com/iO-Academy/aptitude-test/tree/master/api) to be up and running 
to work correctly. When working locally be sure it is working and able to recieve requests.  

Once cloned run `npm i` in the root of the project to download the dependancies.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Setting up Eslint & Prettier in PHP Storm

Open the PHPStorm Preferences, go to Languages and Frameworks | JavaScript | Code Quality Tools | ESLint, and select the
Automatic ESLint configuration option. Tick the box ```run eslint --fix on save``` and click OK. This will standardise 
your code styles automatically when you save. 

### Routing with React-Router-dom

The route declarations are made in `src/Routes/Routes.js`. See the [documentation](https://reactrouter.com/web/guides/quick-start) for more information on how to manage routes.

Surround any page route specifically for applicants with `<PrivateRoute></PrivateRoute>` eg:
```
<PrivateRoute path="/exam">
  <Exam />
</PrivateRoute>
```

Surround any page route specifically for admin with `<AdminRoute></AdminRoute>` eg:
```
<AdminRoute path="/admin">
  <Admin />
</AdminRoute>
```

### Environment Variables

These live in `.env` - They must begin with `REACT_APP`

### Useful hooks/functions 

There are some custom built hooks/functions that provide functionality that may remove the need to 'reinvent the wheel' 
when developing features. They live in `src/Hooks`.

`useAuth` - Provides neat API to find out who, if anyone, is currently logged in. Also provides methods to login/logout.

`useFetch` - Use this to make API calls - it will always use the correct base URL when local/live.

### Front end styling

The application contains SCSS - just use `.scss` files where you would usually use `.css`. The `create-react-app` 
compliation process will take care of the rest automatically. 

### An example of a performant 'auto updating' front end view

Often you will be making an initial API call to get data then manipulating it through user actions and wanting to see 
live updates on the page. Hooks provide a good way to do this, however can often be misused and lead to the creation of 
an infinite loop of re-renders.

The example below demonstrates a pattern that prevents infinite loops of re renders.

```jsx
import React, { useEffect, useState } from 'react';
import LoginButton from '../../Atoms/LoginButton/LoginButton';
import fetchApi from '../../../Hooks/useFetch';

// This component is an example of displaying data from an API and keeping the front end up to date with any changes
// made to the data at the API in real time without needing to reload the page.
const Admin = () => {
    // initial state of all the users is null until it is populated by the API call
    const [users, setUsers] = useState(null);

    // the use effect hook is passed a 2nd param of [], ensuring it only runs once when the component is first mounted
    useEffect(async () => {
        // common error: the code calling the API is often placed directly in here - abstracting it into its own
        // function (getUsers) is key to this pattern working
        getUsers();
    }, []);

    // because it is abstracted here we have control when it occurs - once when component first mounted then whenever
    // we choose from that point onwards, thus no infinite recalling.
    const getUsers = async () => {
        let response = await fetchApi(`user`);
        if (response.success) {
            return setUsers(response.data);
        }
    };

    // getUsers is called after we have edited the data that is displayed on the page, thus triggering a re-render and
    // making sure our front end is up to date with any changes made at the database.
    const editUserExample = async (user) => {
        // this function just edits the user data at the API so that we are faced with the problem we are trying to
        // solve - mismatches between the front end data displayed and what is actually saved at the database.
        user.canRetake = 1;
        let response = await fetchApi(`user/edit`, {
            method: 'POST',
            body: user,
        });
        getUsers();
    };

    return (
        <>
            <LoginButton />
            <p onClick={handleClick}>Admin page</p>
            {users &&
                users.map((user) => {
                    return (
                        <p key={user.id}>
                            {user.name}
                            {user.canRetake === '0' && <button onClick={() => editUserExample(user)}>Click</button>}
                        </p>
                    );
                })}
        </>
    );
};

export default Admin;
```