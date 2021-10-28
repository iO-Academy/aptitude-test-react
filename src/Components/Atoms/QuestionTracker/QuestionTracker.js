import './styles.scss';
import { Row } from 'react-bootstrap';

const QuestionTracker = ({ currentQuestionId, numberOfQuestions }) => {
    return (
        <Row className="questionTracker">
            <h3>
                Question <span className="highlight">{currentQuestionId}</span> of {numberOfQuestions}
            </h3>
        </Row>
    );
};

export default QuestionTracker;
