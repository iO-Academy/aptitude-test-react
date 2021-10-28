import QuestionTracker from '../../Atoms/QuestionTracker/QuestionTracker';
import QuestionMain from '../../Molecules/QuestionMain/QuestionMain';
import NavButton from '../../Atoms/NavButton/NavButton';
import { Container, Row } from 'react-bootstrap';

const QuestionView = ({
    currentQuestionId,
    userAnswers,
    changeCurrentId,
    currentQuestion,
    modifyQuestionId,
    updateUserAnswers,
    numberOfQuestions,
    getAnswers,
    calculateScore,
    testAnswers,
}) => {
    return (
        <Container>
            <QuestionTracker currentQuestionId={currentQuestionId} numberOfQuestions={numberOfQuestions} />
            <QuestionMain
                currentQuestion={currentQuestion}
                updateUserAnswers={updateUserAnswers}
                currentQuestionId={currentQuestionId}
                userAnswers={userAnswers}
            />
            <Row>
                {currentQuestionId !== 1 && (
                    <NavButton
                        action="previous"
                        currentQuestionId={currentQuestionId}
                        changeCurrentId={changeCurrentId}
                        modifyQuestionId={modifyQuestionId}
                    />
                )}
                {currentQuestionId !== numberOfQuestions && (
                    <NavButton
                        action="next"
                        currentQuestionId={currentQuestionId}
                        changeCurrentId={changeCurrentId}
                        modifyQuestionId={modifyQuestionId}
                    />
                )}
                {currentQuestionId === numberOfQuestions && (
                    <NavButton
                        action="finish"
                        getAnswers={getAnswers}
                        calculateScore={calculateScore}
                        userAnswers={userAnswers}
                        testAnswers={testAnswers}
                    />
                )}
            </Row>
        </Container>
    );
};

export default QuestionView;
