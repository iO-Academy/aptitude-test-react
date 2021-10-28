import './navButtonStyles.scss';
import { Button, Col } from 'react-bootstrap';
const NavButton = ({ action, changeCurrentId, currentQuestionId, modifyQuestionId }) => {
    const handleClick = () => {
        if (action === 'next') {
            modifyQuestionId(changeCurrentId(currentQuestionId + 1));
        } else if (action === 'previous') {
            modifyQuestionId(changeCurrentId(currentQuestionId - 1));
        }
    };
    return (
        <Col className={action === 'next' ? 'text-end' : ''}>
            <Button
                onClick={handleClick}
                variant="flat"
                className={action === 'next' ? 'nextButton align-items-end' : 'previousButton'}
            >
                {action === 'next' ? 'next' : 'previous'}
            </Button>
        </Col>
    );
};

export default NavButton;
