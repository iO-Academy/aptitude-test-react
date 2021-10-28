import { Form, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import './styles.scss';

const QuestionMain = (props) => {
    const [val, setVal] = useState(0);

    useEffect(() => {
        props.updateUserAnswers(props.currentQuestion.id, val);
    }, [val]);

    useEffect(() => {
        let res = props.userAnswers[props.currentQuestionId] ?? 0;
        setVal(res);
    }, [props.currentQuestion]);

    const handleClick = (e) => {
        setVal(e.target.value);
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
                    onChange={(e) => handleClick(e)}
                    checked={val === '1' ? true : ''}
                />

                <Form.Check
                    label={props.currentQuestion.option2}
                    type="radio"
                    id="option2"
                    value="2"
                    name="currentQuestion"
                    onChange={(e) => handleClick(e)}
                    checked={val === '2' ? true : ''}
                />

                <Form.Check
                    label={props.currentQuestion.option3}
                    type="radio"
                    id="option3"
                    value="3"
                    name="currentQuestion"
                    onChange={(e) => handleClick(e)}
                    checked={val === '3' ? true : ''}
                />

                <Form.Check
                    label={props.currentQuestion.option4}
                    type="radio"
                    id="option4"
                    value="4"
                    name="currentQuestion"
                    onChange={(e) => handleClick(e)}
                    checked={val === '4' ? true : ''}
                />

                <Form.Check
                    label={props.currentQuestion.option5}
                    type="radio"
                    id="option5"
                    value="5"
                    name="currentQuestion"
                    onChange={(e) => handleClick(e)}
                    checked={val === '5' ? true : ''}
                />
            </Form>
        </Row>
    );
};

export default QuestionMain;
