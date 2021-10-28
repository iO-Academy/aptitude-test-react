import './styles.scss';
import { Row } from 'react-bootstrap';

const QuestionTracker = (props) => {
    return (
        <Row className="questionTracker">
            <h3>
                Question <span className="highlight">{props.currentQuestionId}</span> of {props.numberOfQuestions}
            </h3>
        </Row>
    );
};

export default QuestionTracker;
