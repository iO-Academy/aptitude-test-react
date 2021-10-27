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
            {props.currentQuestionId !== 1 && (
                <NavButton
                    action="previous"
                    currentQuestionId={props.currentQuestionId}
                    changeCurrentId={props.changeCurrentId}
                    numberOfQuestions={props.numberOfQuestions}
                    modifyQuestionId={props.modifyQuestionId}
                />
            )}
            {props.currentQuestionId !== props.numberOfQuestions && (
                <NavButton
                    action="next"
                    currentQuestionId={props.currentQuestionId}
                    changeCurrentId={props.changeCurrentId}
                    numberOfQuestions={props.numberOfQuestions}
                    modifyQuestionId={props.modifyQuestionId}
                />
            )}
        </>
    );
};

export default QuestionView;
