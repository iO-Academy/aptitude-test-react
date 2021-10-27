import { useEffect, useState } from 'react';
import fetchApi from '../../../Hooks/useFetch';
import QuestionView from '../QuestionView/QuestionView';
import { Container } from 'react-bootstrap';

const Test = () => {
    const [userAnswers, setUserAnswers] = useState({});
    const [questions, setQuestions] = useState([]);
    const [currentQuestionId, setCurrentQuestionId] = useState(1);
    const [currentQuestion, setCurrentQuestion] = useState([]);
    const [numberOfQuestions, setNumberOfQuestions] = useState(0);

    useEffect(async () => {
        let data = await fetchApi('/question');
        setQuestions(data.data);
        setNumberOfQuestions(data.data.length);
    }, []);

    function updateUserAnswers(currentQuestionId, userAnswer) {
        if (userAnswer >= 1 && userAnswer <= 5 && validateTestLength(currentQuestionId)) {
            let currentAnswers = userAnswers;
            currentAnswers[currentQuestionId] = userAnswer;
            setUserAnswers(currentAnswers);
        }
    }

    function findQuestion(currentQuestionId, setCurrentQuestion) {
        useEffect(async () => {
            let res = await fetchApi('/question/' + currentQuestionId);
            setCurrentQuestion(res.data);
            return currentQuestion;
        }, [currentQuestionId]);
    }

    function validateTestLength(targetQuestionId) {
        if (targetQuestionId > 0 && targetQuestionId <= numberOfQuestions) {
            return true;
        } else {
            return false;
        }
    }

    findQuestion(currentQuestionId, setCurrentQuestion);
    const modifyQuestionId = (targetQuestionId) => {
        if (validateTestLength(targetQuestionId)) {
            setCurrentQuestionId(targetQuestionId);
        }
    };

    return (
        <Container>
            <QuestionView
                currentQuestionId={currentQuestionId}
                numberOfQuestions={numberOfQuestions}
                currentQuestion={currentQuestion}
                modifyQuestionId={modifyQuestionId}
                updateUserAnswers={updateUserAnswers}
            />
        </Container>
    );
};
export default Test;
