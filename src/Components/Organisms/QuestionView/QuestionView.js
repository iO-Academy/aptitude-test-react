import QuestionTracker from '../../Atoms/QuestionTracker/QuestionTracker';
import FlagButton from '../../Atoms/FlagButton/FlagButton';
import QuestionMain from '../../Molecules/QuestionMain/QuestionMain';
import NavButton from '../../Atoms/NavButton/NavButton';

const QuestionView = (props) => {
    return (
        <>
            <QuestionTracker currentQuestionId={props.currentQuestionId} numberOfQuestions={props.numberOfQuestions} />
            <FlagButton />
            <QuestionMain currentQuestion={props.currentQuestion} changeCurrentId={props.setCurrentQuestionId} />
            {props.currentQuestionId !== 1 && (
                <NavButton
                    action="previous"
                    currentQuestionId={props.currentQuestionId}
                    changeCurrentId={props.changeCurrentId}
                    numberOfQuestions={props.numberOfQuestions}
                />
            )}
            {props.currentQuestionId !== props.numberOfQuestions && (
                <NavButton
                    action="next"
                    currentQuestionId={props.currentQuestionId}
                    changeCurrentId={props.changeCurrentId}
                    numberOfQuestions={props.numberOfQuestions}
                />
            )}
        </>
    );
};

export default QuestionView;
