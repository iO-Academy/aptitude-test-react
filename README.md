# Aptitude Test

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) using the typescript template. 

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Setting up Eslint & Prettier in PHP Storm

Open the PHPStorm Preferences, go to Languages and Frameworks | JavaScript | Code Quality Tools | ESLint, and select the Automatic ESLint configuration option. Tick the box ```run eslint --fix on save``` and click OK. This will standardise your code styles automatically when you save. 

### Useful typescript return types

If you have created a functional component use `React.FC`

### Routing with React-Router-dom

The route declarations are made in `src/Routes/Routes.js`. See the [documentation](https://reactrouter.com/web/guides/quick-start) for more information on how to manage routes.

Surround any page route you require to be protected with `<PrivateRoute></PrivateRoute>` eg:
```
<PrivateRoute path="/admin">
  <Admin />
</PrivateRoute>
```

### Environment Variables

These live in `.env` - They must begin with `REACT_APP` 