import { useEffect, useState } from 'react';
import fetchApi from '../../../Hooks/useFetch';

const Test = () => {
    const [userAnswers, setUserAnswers] = useState({});
    const [questions, setQuestions] = useState([]);
    const [currentQuestionId, setCurrentQuestionId] = useState(1);
    const [currentQuestion, setCurrentQuestion] = useState([]);

    useEffect(async () => {
        let data = await fetchApi('/question');
        setQuestions(data.data);
    }, []);

    function updateUserAnswers(currentQuestionId, userAnswer) {
        if (userAnswer >= 1 && userAnswer <= 5 && validateTestLength(currentQuestionId)) {
            let currentAnswers = userAnswers;
            currentAnswers[currentQuestionId] = userAnswer;
            setUserAnswers(currentAnswers);
        }
    }

    function find(currentQuestionId, setCurrentQuestion) {
        useEffect(async () => {
            let res = await fetchApi('/question/' + currentQuestionId);
            setCurrentQuestion(res.data);
            return currentQuestion;
        }, [currentQuestionId]);
    }

    function validateTestLength(targetQuestionId) {
        let numberOfQuestions = questions.length;
        if (targetQuestionId > 0 && targetQuestionId <= numberOfQuestions) {
            return true;
        } else {
            return false;
        }
    }

    find(currentQuestionId, setCurrentQuestion);
    const modifyQuestionId = (targetQuestionId) => {
        // numberOfQuestions moved to global scope for re-use in updateUserAnswers function
        // If statement turned into a function for validation re-use in updateUserAnswers function
        if (validateTestLength(targetQuestionId)) {
            setCurrentQuestionId(targetQuestionId);
        }
    };

    console.log(userAnswers);
    return (
        <>
            <p>{currentQuestion.text}</p>
            <p onClick={() => modifyQuestionId(3)}>Hello Hello Testing Testing Quiz Time</p>
            <p>{currentQuestionId}</p>
            <p onClick={() => updateUserAnswers(4, 5)}>updateUserAnswers test</p>
        </>
    );
};
export default Test;
