import { Container, Form } from 'react-bootstrap';
import './styles.scss';

const QuestionMain = (props) => {
    return (
        <Container className="questionContainer">
            <h3> {props.currentQuestion.text}</h3>
            <Form>
                <Form.Check
                    label={props.currentQuestion.option1}
                    type="radio"
                    id="option1"
                    value="1"
                    name="currentQuestion"
                />

                <Form.Check
                    label={props.currentQuestion.option2}
                    type="radio"
                    id="option2"
                    value="2"
                    name="currentQuestion"
                />

                <Form.Check
                    label={props.currentQuestion.option3}
                    type="radio"
                    id="option3"
                    value="3"
                    name="currentQuestion"
                />

                <Form.Check
                    label={props.currentQuestion.option4}
                    type="radio"
                    id="option4"
                    value="4"
                    name="currentQuestion"
                />

                <Form.Check
                    label={props.currentQuestion.option5}
                    type="radio"
                    id="option5"
                    value="5"
                    name="currentQuestion"
                />
            </Form>
        </Container>
    );
};

export default QuestionMain;
