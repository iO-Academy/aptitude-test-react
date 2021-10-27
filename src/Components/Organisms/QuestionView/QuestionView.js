import QuestionTracker from '../../Atoms/QuestionTracker/QuestionTracker';
import QuestionMain from '../../Molecules/QuestionMain/QuestionMain';
import NavButton from '../../Atoms/NavButton/NavButton';
import { Col, Container, Row } from 'react-bootstrap';

const QuestionView = (props) => {
    return (
        <Container>
            <QuestionTracker currentQuestionId={props.currentQuestionId} numberOfQuestions={props.numberOfQuestions} />
            <Row>
                <Col>
                    {props.currentQuestionId !== 1 && (
                        <NavButton
                            action="previous"
                            currentQuestionId={props.currentQuestionId}
                            changeCurrentId={props.changeCurrentId}
                            numberOfQuestions={props.numberOfQuestions}
                            modifyQuestionId={props.modifyQuestionId}
                        />
                    )}
                </Col>
                <Col className="justify-content-end">
                    {props.currentQuestionId !== props.numberOfQuestions && (
                        <NavButton
                            action="next"
                            currentQuestionId={props.currentQuestionId}
                            changeCurrentId={props.changeCurrentId}
                            numberOfQuestions={props.numberOfQuestions}
                            modifyQuestionId={props.modifyQuestionId}
                        />
                    )}
                </Col>
            </Row>
            <QuestionMain
                currentQuestion={props.currentQuestion}
                updateUserAnswers={props.updateUserAnswers}
                currentQuestionId={props.currentQuestionId}
                userAnswers={props.userAnswers}
            />
        </Container>
    );
};

export default QuestionView;
