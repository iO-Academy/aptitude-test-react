import QuestionTracker from '../../Atoms/QuestionTracker/QuestionTracker';
import FlagButton from '../../Atoms/FlagButton/FlagButton';
import QuestionMain from '../../Molecules/QuestionMain/QuestionMain';
import NavButton from '../../Atoms/NavButton/NavButton';

const QuestionView = (props) => {
    return (
        <>
            <QuestionTracker currentQuestionID={props.currentQuestionID} numberOfQuestions={props.numberOfQuestions} />
            <FlagButton />
            <QuestionMain currentQuestion={props.currentQuestion} changeCurrentID={props.setCurrentQuestionId} />
            <NavButton action="next" />
            <NavButton action="previous" />
        </>
    );
};

export default QuestionView;
