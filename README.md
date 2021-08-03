# Aptitude Test

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). There are some 
great additional docs [here](https://create-react-app.dev/) too

This application requires [this API](https://github.com/iO-Academy/aptitude-test/tree/master/api) to be up and running 
to work correctly. When working locally be sure it is working and able to recieve requests.  

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