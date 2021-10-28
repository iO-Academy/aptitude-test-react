import Test from '../../Organisms/Test/Test';
import './styles.scss';
import { useState } from 'react';
import CompletedTest from '../CompletedTest';

const Exam = () => {
    const [finished, setFinished] = useState(false);
    const [error, setError] = useState(false);

    const finishTest = (complete = false) => {
        setFinished(true);
        setError(complete);
    };

    return (
        <>
            {finished && <CompletedTest error={error} />}
            {!finished && <Test finish={finishTest} />}
        </>
    );
};

export default Exam;
