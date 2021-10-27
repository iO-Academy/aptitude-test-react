import './navButtonStyles.scss';
import { Button, Col } from 'react-bootstrap';
const NavButton = (props) => {
    const handleClick = () => {
        if (props.action === 'next') {
            props.modifyQuestionId(props.changeCurrentId(props.currentQuestionId + 1));
        } else if (props.action === 'previous') {
            props.modifyQuestionId(props.changeCurrentId(props.currentQuestionId - 1));
        }
    };
    return (
        <Col className={props.action === 'next' ? 'text-end' : ''}>
            <Button
                onClick={handleClick}
                variant="flat"
                className={props.action === 'next' ? 'nextButton align-items-end' : 'previousButton'}
            >
                {props.action === 'next' ? 'next' : 'previous'}
            </Button>
        </Col>
    );
};

export default NavButton;
