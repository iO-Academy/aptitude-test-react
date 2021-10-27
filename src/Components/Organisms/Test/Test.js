import { useEffect, useState } from 'react';
import fetchApi from '../../../Hooks/useFetch';
import QuestionView from '../QuestionView/QuestionView';
import { Container, Placeholder } from 'react-bootstrap';

const Test = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionId, setCurrentQuestionId] = useState(1);
    const [currentQuestion, setCurrentQuestion] = useState([]);
    const [numberOfQuestions, setNumberOfQuestions] = useState(0);
    useEffect(async () => {
        let data = await fetchApi('/question');
        setQuestions(data.data);
        setNumberOfQuestions(data.data.length);
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
