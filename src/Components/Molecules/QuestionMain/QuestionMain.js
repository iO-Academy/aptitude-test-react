import { Form, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import './styles.scss';

const QuestionMain = ({ updateUserAnswers, currentQuestionId, userAnswers, currentQuestion }) => {
    const [val, setVal] = useState(0);

    useEffect(() => {
        updateUserAnswers(currentQuestion.id, val);
    }, [val]);

    useEffect(() => {
        let res = userAnswers[currentQuestionId] ?? 0;
        setVal(res);
    }, [currentQuestion]);

    const handleClick = (e) => {
        setVal(e.target.value);
    };

    return (
        <Row className="questionContainer">
            <h3> {currentQuestion.text}</h3>
            <Form className="align-items-start">
                {currentQuestion.option1 !== '' && (
                    <Form.Check
                        label={currentQuestion.option1}
                        type="radio"
                        id="option1"
                        value="1"
                        name="currentQuestion"
                        onChange={(e) => handleClick(e)}
                        checked={val === '1' ? true : ''}
                    />
                )}

                {currentQuestion.option2 !== '' && (
                    <Form.Check
                        label={currentQuestion.option2}
                        type="radio"
                        id="option2"
                        value="2"
                        name="currentQuestion"
                        onChange={(e) => handleClick(e)}
                        checked={val === '2' ? true : ''}
                    />
                )}

                {currentQuestion.option3 !== '' && (
                    <Form.Check
                        label={currentQuestion.option3}
                        type="radio"
                        id="option3"
                        value="3"
                        name="currentQuestion"
                        onChange={(e) => handleClick(e)}
                        checked={val === '3' ? true : ''}
                    />
                )}

                {currentQuestion.option4 !== '' && (
                    <Form.Check
                        label={currentQuestion.option4}
                        type="radio"
                        id="option4"
                        value="4"
                        name="currentQuestion"
                        onChange={(e) => handleClick(e)}
                        checked={val === '4' ? true : ''}
                    />
                )}

                {currentQuestion.option5 !== '' && (
                    <Form.Check
                        label={currentQuestion.option5}
                        type="radio"
                        id="option5"
                        value="5"
                        name="currentQuestion"
                        onChange={(e) => handleClick(e)}
                        checked={val === '5' ? true : ''}
                    />
                )}
            </Form>
        </Row>
    );
};

export default QuestionMain;
