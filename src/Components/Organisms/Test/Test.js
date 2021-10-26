import { useEffect, useState } from 'react';
import fetchApi from '../../../Hooks/useFetch';
import QuestionView from '../QuestionView/QuestionView';

const Test = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionId, setCurrentQuestionId] = useState(1);
    const [currentQuestion, setCurrentQuestion] = useState([]);
    useEffect(async () => {
        let data = await fetchApi('/question');
        setQuestions(data.data);
    }, []);
    function find(currentQuestionId, setCurrentQuestion) {
        useEffect(async () => {
            let res = await fetchApi('/question/' + currentQuestionId);
            setCurrentQuestion(res.data);
            return currentQuestion;
        }, [currentQuestionId]);
    }
    find(currentQuestionId, setCurrentQuestion);
    const modifyQuestionId = (targetQuestionId) => {
        let numberOfQuestions = questions.length;

        if (targetQuestionId > 0 && targetQuestionId <= numberOfQuestions) {
            setCurrentQuestionId(targetQuestionId);
        }
    };
    return (
        <>
            <QuestionView currentQuestionId={currentQuestionId} changeCurrentId={setCurrentQuestionId} />
        </>
    );
};
export default Test;
