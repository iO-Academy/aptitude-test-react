import './navButtonStyles.scss';
import { Button, Col } from 'react-bootstrap';
const NavButton = ({
    action,
    changeCurrentId,
    currentQuestionId,
    modifyQuestionId,
    getAnswers,
    calculateScore,
    userAnswers,
    testAnswers,
    sendAnswers,
}) => {
    const handleClick = () => {
        if (action === 'next') {
            modifyQuestionId(changeCurrentId(currentQuestionId + 1));
        } else if (action === 'previous') {
            modifyQuestionId(changeCurrentId(currentQuestionId - 1));
        } else if (action === 'finish') {
            // Need to update userAnswers state for last question before calculateScore is called
            getAnswers();
        }
    };
    const createButtonText = (action) => {
        if (action === 'next') {
            return 'Next';
        } else if (action === 'previous') {
            return 'Previous';
        } else if (action === 'finish') {
            return 'Finish';
        }
    };
    return (
        <Col className={action !== 'previous' ? 'text-end' : ''}>
            <Button onClick={handleClick} variant="flat" className={action === 'finish' ? 'finishButton' : ''}>
                {createButtonText(action)}
            </Button>
        </Col>
    );
};

export default NavButton;
