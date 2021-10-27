import './navButtonStyles.scss';
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
            <button onClick={handleClick} className={props.action === 'next' ? 'nextButton' : 'previousButton'}>
                {props.action === 'next' ? 'next' : 'previous'}
            </button>
        </>
    );
};

export default NavButton;
