import './navButtonStyles.scss';
const NavButton = (props) => {
    const incrementQuestionId = () => {
        if (props.action === 'next') {
            props.changeCurrentId(props.currentQuestionId + 1);
        } else if (props.action === 'previous') {
            props.changeCurrentId(props.currentQuestionId - 1);
        }
    };
    return (
        <>
            <button onClick={incrementQuestionId} className={props.action === 'next' ? 'nextButton' : 'previousButton'}>
                {props.action === 'next' ? 'next' : 'previous'}
            </button>
        </>
    );
};

export default NavButton;
