import { useEffect, useState } from 'react';
import fetchApi from '../../../Hooks/useFetch';
import QuestionView from '../QuestionView/QuestionView';
import { Container } from 'react-bootstrap';
import { useAuth } from '../../../Hooks/useAuth';

const Test = ({ finish }) => {
    const [userAnswers, setUserAnswers] = useState({});
    const [questions, setQuestions] = useState([]);
    const [testAnswers, setTestAnswers] = useState([]);
    const [currentQuestionId, setCurrentQuestionId] = useState(1);
    const [currentQuestion, setCurrentQuestion] = useState({});
    const [numberOfQuestions, setNumberOfQuestions] = useState(0);
    const user = useAuth();

    const createQIds = (data) => {
        let qIdCount = 0;
        data.data.forEach((question) => {
            question.qId = ++qIdCount;
        });
        return data.data;
    };

    const updateUserAnswers = (qid, userAnswer) => {
        if (userAnswer >= 1 && userAnswer <= 5 && validateTestLength(currentQuestionId)) {
            let currentAnswers = userAnswers;
            currentAnswers[qid] = userAnswer;
            setUserAnswers(currentAnswers);
        }
    };

    const validateTestLength = (targetQuestionId) => {
        if (targetQuestionId > 0 && targetQuestionId <= numberOfQuestions) {
            return true;
        } else {
            return false;
        }
    };
    const findQuestion = (id) => {
        if (questions.length) {
            let tempQ = questions[id - 1];
            setCurrentQuestion(tempQ);
        }
    };
    const modifyQuestionId = (targetQuestionId) => {
        if (validateTestLength(targetQuestionId)) {
            setCurrentQuestionId(targetQuestionId);
        }
    };

    const getAnswers = async () => {
        let userTestId = user.user.test_id;
        let answers = await fetchApi(`/answer?test_id=${userTestId}`);
        setTestAnswers(answers.data);
    };
    useEffect(() => {
        if (testAnswers.length) {
            let score = calculateScore(userAnswers, testAnswers);
            sendAnswers(score);
        }
    }, [testAnswers]);

    const calculateScore = (userAnswers, testAnswers) => {
        let score = 0;
        let answersWeNeed = testAnswers.filter((testAnswer) => {
            return testAnswer.id in userAnswers;
        });
        answersWeNeed.forEach((testAnswer) => {
            if (userAnswers[testAnswer.id] == testAnswer.answer) {
                score++;
            }
        });
        return score;
    };

    const userNoRetake = async () => {
        let userToUpdate = {
            email: user.user.email,
            name: user.user.name,
            canRetake: 0,
            id: user.user.id,
            test_id: user.user.test_id,
        };
        await fetchApi(`user/edit`, {
            method: 'POST',
            body: userToUpdate,
        });
    };

    const sendAnswers = async (score) => {
        let answersToSend = {
            uid: user.user.id,
            answers: userAnswers,
            score: score,
            testLength: numberOfQuestions,
            time: '29.55',
        };

        let postTheAnswers = await fetchApi('answer', {
            method: 'POST',
            body: answersToSend,
        });

        if (postTheAnswers.success === true) {
            finish();
            userNoRetake();
        } else {
            finish(true);
        }
    };

    useEffect(async () => {
        let userTestId = user.user.test_id;
        let data = await fetchApi(`/question?test_id=${userTestId}`);
        let res = createQIds(data);
        setQuestions(res);
        setNumberOfQuestions(data.data.length);
        modifyQuestionId(1);
    }, []);

    useEffect(async () => {
        findQuestion(currentQuestionId);
    }); //removed dependency to ensure render on first load

    return (
        <Container>
            <QuestionView
                currentQuestionId={currentQuestionId}
                numberOfQuestions={numberOfQuestions}
                currentQuestion={currentQuestion}
                modifyQuestionId={modifyQuestionId}
                updateUserAnswers={updateUserAnswers}
                changeCurrentId={setCurrentQuestionId}
                userAnswers={userAnswers}
                getAnswers={getAnswers}
                calculateScore={calculateScore}
                testAnswers={testAnswers}
                sendAnswers={sendAnswers}
            />
        </Container>
    );
};

export default Test;
