import { Form, Row } from 'react-bootstrap';
import './styles.scss';

const QuestionMain = (props) => {
    const handleClick = (e) => {
        props.updateUserAnswers(props.currentQuestionId, parseInt(e.target.value));
    };

    return (
        <Row className="questionContainer">
            <h3> {props.currentQuestion.text}</h3>
            <Form className="align-items-start">
                <Form.Check
                    label={props.currentQuestion.option1}
                    type="radio"
                    id="option1"
                    value="1"
                    name="currentQuestion"
                    onClick={(e) => handleClick(e)}
                    {...(props.userAnswers[props.currentQuestionId] === 1 ? { checked: true } : {})}
                />

                <Form.Check
                    label={props.currentQuestion.option2}
                    type="radio"
                    id="option2"
                    value="2"
                    name="currentQuestion"
                    onClick={(e) => handleClick(e)}
                    {...(props.userAnswers[props.currentQuestionId] === 2 ? { checked: 'true' } : {})}
                />

                <Form.Check
                    label={props.currentQuestion.option3}
                    type="radio"
                    id="option3"
                    value="3"
                    name="currentQuestion"
                    onClick={(e) => handleClick(e)}
                    {...(props.userAnswers[props.currentQuestionId] === 3 ? { checked: 'true' } : {})}
                />

                <Form.Check
                    label={props.currentQuestion.option4}
                    type="radio"
                    id="option4"
                    value="4"
                    name="currentQuestion"
                    onClick={(e) => handleClick(e)}
                    {...(props.userAnswers[props.currentQuestionId] === 4 ? { checked: 'true' } : {})}
                />

                <Form.Check
                    label={props.currentQuestion.option5}
                    type="radio"
                    id="option5"
                    value="5"
                    name="currentQuestion"
                    onClick={(e) => handleClick(e)}
                    {...(props.userAnswers[props.currentQuestionId] === 5 ? { checked: 'true' } : {})}
                />
            </Form>
        </Row>
    );
};

export default QuestionMain;
