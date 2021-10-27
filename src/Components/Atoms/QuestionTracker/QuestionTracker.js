import './styles.scss';
import { Container } from 'react-bootstrap';

const QuestionTracker = (props) => {
    return (
        <Container>
            <h3>
                Question <span className="highlight">{props.currentQuestionId}</span> of {props.numberOfQuestions}
            </h3>
        </Container>
    );
};

export default QuestionTracker;
