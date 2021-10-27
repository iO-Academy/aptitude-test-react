import QuestionTracker from '../../Atoms/QuestionTracker/QuestionTracker';
import QuestionMain from '../../Molecules/QuestionMain/QuestionMain';
import NavButton from '../../Atoms/NavButton/NavButton';

const QuestionView = (props) => {
    return (
        <>
            <QuestionTracker currentQuestionId={props.currentQuestionId} numberOfQuestions={props.numberOfQuestions} />
            <QuestionMain
                currentQuestion={props.currentQuestion}
                updateUserAnswers={props.updateUserAnswers}
                currentQuestionId={props.currentQuestionId}
            />
            <NavButton action="next" modifyQuestionId={props.modifyQuestionId} />
            <NavButton action="previous" modifyQuestionId={props.modifyQuestionId} />
        </>
    );
};

export default QuestionView;
