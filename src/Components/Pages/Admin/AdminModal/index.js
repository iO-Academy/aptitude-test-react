//Import AdminModal and Table components from react-bootstrap
import { Modal } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import useJoin from '../../../../Hooks/useJoin';
import useGetData from '../../../../Hooks/useGetData';
import IOLogo from '../../../Atoms/ioLogo';

const AdminModal = (props) => {
    // Set states and declares variables
    const [questions, setQuestions] = useState(null);
    const [editedAnswers, setEditedAnswers] = useState([]);
    let answersArray = [];
    let mappedAnswerArray = [];
    // Takes the JSON string mapped onto user.answers and parses it
    // Puts the data into the same format as data fetched from the API
    if (props.user.answers !== '' && typeof props.user.answers !== 'undefined') {
        answersArray = Object.entries(JSON.parse(JSON.parse(props.user.answers)));
    }
    if (answersArray !== [] && typeof answersArray !== 'undefined') {
        mappedAnswerArray = answersArray.map((answer) => {
            return { ...{ question: answer[0] }, ...answer[1] };
        });
    }
    // On mount fetches the question and answer table data from the api
    // Adds the answer column (with the correct option number) from answer table to the questions useState
    // Maps the correct answer text into answer based on the answer option key
    useEffect(async () => {
        let tempQuestions = await useGetData('question');
        let tempAnswers = await useGetData('answer');
        let questionsAnswerKey = useJoin([tempQuestions, 'id', 'answer'], [tempAnswers, 'id', 'answer']);
        setQuestions(
            questionsAnswerKey.map((question) => {
                question.answer = question['option' + question.answer];
                return question;
            }),
        );
        setQuestions(questionsAnswerKey);
    }, []);
    // On update to the questions useState
    // Adds the question text to a temporary array (to include in editedUsers)
    // Uses the same functionality as useJoin with the key on filteredData[0] substituted to 'option'
    // concatenated with the answerID (in place of the data2key2 variable in useJoin)
    // If the applicant has not answered, returns null
    // Then maps this onto editedAnswers
    useEffect(() => {
        if (questions && mappedAnswerArray !== []) {
            let tempAnswerArray = useJoin([mappedAnswerArray, 'question', 'questionText'], [questions, 'id', 'text']);
            let optionAnswerArray = tempAnswerArray.map((answer) => {
                let filteredData = questions.filter((question) => {
                    return question['id'] === answer['question'];
                });
                if (filteredData[0]) {
                    answer['applicantAnswer'] = filteredData[0]['option' + answer.answerID];
                    return answer;
                }
                answer['applicantAnswer'] = null;
                return answer;
            });
            setEditedAnswers(useJoin([optionAnswerArray, 'question', 'correctAnswer'], [questions, 'id', 'answer']));
        }
    }, [questions]);
    return (
        <Modal size="xl" show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Answers</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table className="table table-responsive" size="sm">
                    <thead>
                        <tr>
                            <th scope="col" className="col-sm-4">
                                Question
                            </th>
                            <th scope="col" className="col-sm-2 text-center">
                                Correct Answer
                            </th>
                            <th scope="col" className="col-sm-2 text-center">
                                Applicant Answer
                            </th>
                            <th scope="col" className="col-sm-1 text-center">
                                Correct?
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {editedAnswers.map((answer) => {
                            return (
                                <tr key={answer.id}>
                                    <td>{answer.questionText}</td>
                                    <td className="text-center">{answer.correctAnswer}</td>
                                    <td
                                        className={
                                            'text-center ' +
                                            (answer.applicantAnswer ? (answer.isCorrect ? 'pass' : 'fail') : '')
                                        }
                                    >
                                        {answer.applicantAnswer ? answer.applicantAnswer : 'N/A'}
                                    </td>
                                    <td className="text-center align-middle">
                                        {answer.applicantAnswer ? (
                                            answer.correctAnswer === answer.applicantAnswer ? (
                                                <IOLogo colour="green" width="50" height="50" />
                                            ) : (
                                                <IOLogo colour="red" width="50" height="50" />
                                            )
                                        ) : (
                                            <IOLogo colour="black" width="50" height="50" />
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Modal.Body>
        </Modal>
    );
};

export default AdminModal;
