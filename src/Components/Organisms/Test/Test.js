import { useEffect, useState } from 'react';
import fetchApi from '../../../Hooks/useFetch';

const Test = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionId, setCurrentQuestionId] = useState(1);
    useEffect(async () => {
        let data = await fetchApi('/question');
        setQuestions(data.data);
    }, []);
    const modifyQuestionId = (targetQuestionId) => {
        let numberOfQuestions = questions.length;

        if (targetQuestionId > 0 && targetQuestionId <= numberOfQuestions) {
            setCurrentQuestionId(targetQuestionId);
        }
    };
    return (
        <>
            <p onClick={() => modifyQuestionId(25)}>Hello Hello Testing Testing Quiz Time</p>
            <p>{currentQuestionId}</p>
        </>
    );
};
export default Test;
