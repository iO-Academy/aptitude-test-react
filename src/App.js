import React from 'react';
import './App.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { ProvideAuth } from './Hooks/useAuth';
import Routes from './Routes/Routes';

const App = () => {
    return (
        <ProvideAuth>
            <Router>
                <Routes />
            </Router>
        </ProvideAuth>
    );
};

export default App;
