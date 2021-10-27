import './normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
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
