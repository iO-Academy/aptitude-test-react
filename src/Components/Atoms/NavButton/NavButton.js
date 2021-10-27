import './navButtonStyles.scss';
import { Button } from 'react-bootstrap';
const NavButton = (props) => {
    const handleClick = () => {
        if (props.action === 'next') {
            props.modifyQuestionId(props.changeCurrentId(props.currentQuestionId + 1));
        } else if (props.action === 'previous') {
            props.modifyQuestionId(props.changeCurrentId(props.currentQuestionId - 1));
        }
    };
    return (
        <>
            <Button
                onClick={handleClick}
                variant="flat"
                className={props.action === 'next' ? 'nextButton' : 'previousButton'}
            >
                {props.action === 'next' ? 'next' : 'previous'}
            </Button>
        </>
    );
};

export default NavButton;
