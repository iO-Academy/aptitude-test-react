import { useEffect, useState } from 'react';
import fetchApi from '../../../Hooks/useFetch';

const Test = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionId, setCurrentQuestionId] = useState(1);
    useEffect(async () => {
        let data = await fetchApi('/question');
        setQuestions(data.data);
    }, []);
    return (
        <>
            <p>Hello Hello Testing Testing Quiz Time</p>
        </>
    );
};

export default Test;
