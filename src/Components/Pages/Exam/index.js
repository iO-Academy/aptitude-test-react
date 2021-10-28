import Test from '../../Organisms/Test/Test';
import './styles.scss';
import { useState } from 'react';
import CompletedTest from '../CompletedTest';
import { Container } from 'react-bootstrap';

const Exam = () => {
    const [finished, setFinished] = useState(false);
    const [error, setError] = useState(false);

    const finishTest = (complete = false) => {
        setFinished(true);
        setError(complete);
    };

    return (
        <Container className="text-center mt-3">
            {finished && <CompletedTest error={error} />}
            {!finished && <Test finish={finishTest} />}
        </Container>
    );
};

export default Exam;
