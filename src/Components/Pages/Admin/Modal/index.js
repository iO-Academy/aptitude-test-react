//Import Modal and Table components from react-bootstrap
import { Modal } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import useJoin from '../../../../Hooks/useJoin';
import getData from '../../../../Hooks/getData';

// Create an AdminModal component
const AdminModal = (props) => {
    // Set the component return to give modal content
    const [questions, setQuestions] = useState(null);
    const [editedAnswers, setEditedAnswers] = useState([]);
    let answersArray = [];
    let mappedAnswerArray = [];
    if (props.user.answers !== '' && typeof props.user.answers !== 'undefined') {
        answersArray = Object.entries(JSON.parse(JSON.parse(props.user.answers)));
    }
    if (answersArray !== [] && typeof answersArray !== 'undefined') {
        mappedAnswerArray = answersArray.map((answer) => {
            return { ...{ question: answer[0] }, ...answer[1] };
        });
    }
    useEffect(async () => {
        let tempQuestions = await getData('question');
        let tempAnswers = await getData('answer');
        let questionsAnswerKey = useJoin([tempQuestions, 'id', 'answer'], [tempAnswers, 'id', 'answer']);
        setQuestions(
            questionsAnswerKey.map((question) => {
                question.answer = question['option' + question.answer];
                return question;
            }),
        );
        setQuestions(questionsAnswerKey);
    }, []);
    useEffect(() => {
        if (questions && mappedAnswerArray !== []) {
            let tempAnswerArray = useJoin([mappedAnswerArray, 'question', 'questionText'], [questions, 'id', 'text']);
            let optionAnswerArray = tempAnswerArray.map((answer) => {
                let filteredData2 = questions.filter((question) => {
                    return question['id'] === answer['question'];
                });
                if (filteredData2[0]) {
                    answer['applicantAnswer'] = filteredData2[0]['option' + answer.answerID];
                    return answer;
                }
                answer['applicantAnswer'] = '';
                return answer;
            });
            setEditedAnswers(useJoin([optionAnswerArray, 'question', 'correctAnswer'], [questions, 'id', 'answer']));
        }
    }, [questions]);
    return (
        <Modal size="xl" show={props.show} onHide={props.onHide}>
            {/* Modal header with title */}
            <Modal.Header closeButton>
                <Modal.Title>Answers</Modal.Title>
            </Modal.Header>
            {/* Modal body */}
            <Modal.Body>
                <Table className="table mx-auto">
                    <thead>
                        <tr>
                            {/* Headings for modal table */}
                            <th scope="col">Question</th>
                            <th scope="col">Correct Answer</th>
                            <th scope="col">Applicant Answer</th>
                        </tr>
                    </thead>
                    {/* Map the questions and answers onto the modal table */}
                    <tbody>
                        {editedAnswers.map((answer) => {
                            return (
                                <tr key={answer.id}>
                                    <td>{answer.questionText}</td>
                                    <td>{answer.correctAnswer}</td>
                                    <td>{answer.applicantAnswer}</td>
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
