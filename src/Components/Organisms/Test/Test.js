import { useEffect, useState } from 'react';
import fetchApi from '../../../Hooks/useFetch';
import QuestionView from '../QuestionView/QuestionView';
import { Container } from 'react-bootstrap';

const Test = () => {
    const [userAnswers, setUserAnswers] = useState({});
    const [questions, setQuestions] = useState([]);
    const [currentQuestionId, setCurrentQuestionId] = useState(1);
    const [currentQuestion, setCurrentQuestion] = useState({});
    const [numberOfQuestions, setNumberOfQuestions] = useState(0);
    const createQIds = (data) => {
        let qIdCount = 0;
        data.data.forEach((question) => {
            question.qId = ++qIdCount;
        });
        return data.data;
    };
    const updateUserAnswers = (currentQuestionId, userAnswer) => {
        if (userAnswer >= 1 && userAnswer <= 5 && validateTestLength(currentQuestionId)) {
            let currentAnswers = userAnswers;
            currentAnswers[currentQuestionId] = userAnswer;
            setUserAnswers(currentAnswers);
            console.log(userAnswers);
        }
    };
    const validateTestLength = (targetQuestionId) => {
        if (targetQuestionId > 0 && targetQuestionId <= numberOfQuestions) {
            return true;
        } else {
            return false;
        }
    };
    const findQuestion = () => {
        if (questions.length) {
            let tempQ = questions[currentQuestionId - 1];
            setCurrentQuestion(tempQ);
        }
    };
    const modifyQuestionId = (targetQuestionId) => {
        if (validateTestLength(targetQuestionId)) {
            setCurrentQuestionId(targetQuestionId);
        }
    };
    useEffect(async () => {
        let data = await fetchApi('/question');
        let res = createQIds(data);
        setQuestions(res);
        setNumberOfQuestions(data.data.length);
    }, []);
    useEffect(async () => {
        findQuestion(currentQuestionId);
    }, [currentQuestionId]);

    return (
        <Container>
            <QuestionView
                currentQuestionId={currentQuestionId}
                numberOfQuestions={numberOfQuestions}
                currentQuestion={currentQuestion}
                modifyQuestionId={modifyQuestionId}
                updateUserAnswers={updateUserAnswers}
                changeCurrentId={setCurrentQuestionId}
            />
        </Container>
    );
};

export default Test;
