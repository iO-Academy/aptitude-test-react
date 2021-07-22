import React from 'react';
import './App.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { ProvideAuth } from './Hooks/useAuth';
import LoginButton from './Components/Atoms/LoginButton/LoginButton';
import Routes from './Routes/Routes';

const App = () => {
    return (
        <ProvideAuth>
            <Router>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Login</Link>
                            </li>
                            <li>
                                <Link to="/admin">Admin</Link>
                            </li>
                            <li>
                                <Link to="/exam">Take the test</Link>
                            </li>
                        </ul>
                    </nav>

                    <LoginButton />

                    <Routes />
                </div>
            </Router>
        </ProvideAuth>
    );
};

export default App;
