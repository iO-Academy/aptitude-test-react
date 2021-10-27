import QuestionTracker from '../../Atoms/QuestionTracker/QuestionTracker';
import QuestionMain from '../../Molecules/QuestionMain/QuestionMain';
import NavButton from '../../Atoms/NavButton/NavButton';

const QuestionView = (props) => {
    return (
        <>
            <QuestionTracker currentQuestionID={props.currentQuestionId} numberOfQuestions={props.numberOfQuestions} />
            <QuestionMain currentQuestion={props.currentQuestion} />
            <NavButton action="next" modifyQuestionId={props.modifyQuestionId} />
            <NavButton action="previous" modifyQuestionId={props.modifyQuestionId} />
        </>
    );
};

export default QuestionView;
