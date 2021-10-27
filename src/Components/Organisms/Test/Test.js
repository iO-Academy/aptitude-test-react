import { useEffect, useState } from 'react';
import fetchApi from '../../../Hooks/useFetch';
import QuestionView from '../QuestionView/QuestionView';
import { Container, Placeholder } from 'react-bootstrap';

const Test = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionId, setCurrentQuestionId] = useState(1);
    const [currentQuestion, setCurrentQuestion] = useState([]);
    const [numberOfQuestions, setNumberOfQuestions] = useState(0);
    const createQIds = (data) => {
        let qIdCount = 0;
        data.data.forEach((question) => {
            question.qId = ++qIdCount;
        });
        return data.data;
    };
    useEffect(async () => {
        let data = await fetchApi('/question');
        let res = createQIds(data);
        setQuestions(res);
        setNumberOfQuestions(data.data.length);
    }, []);
    const findQuestion = (currentQuestionId) => {
        let tempQ = questions[currentQuestionId - 1];
        setCurrentQuestion(tempQ);
    };
    useEffect(async () => {
        findQuestion(currentQuestionId);
    }, [currentQuestionId]);
    const modifyQuestionId = (targetQuestionId) => {
        if (targetQuestionId > 0 && targetQuestionId <= numberOfQuestions) {
            setCurrentQuestionId(targetQuestionId);
        }
    };
    return (
        <>
            <Container>
                <QuestionView
                    currentQuestionId={currentQuestionId}
                    numberOfQuestions={numberOfQuestions}
                    currentQuestion={currentQuestion}
                    modifyQuestionId={modifyQuestionId}
                    changeCurrentId={setCurrentQuestionId}
                />
            </Container>
        </>
    );
};
export default Test;
