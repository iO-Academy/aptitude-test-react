//Import Modal and Table components from react-bootstrap
import { Modal } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useState } from 'react';
import useJoin from '../../../../Hooks/useJoin';

// Create an AdminModal component
const AdminModal = (props) => {
    // Set the component return to give modal content
    // const [editedUser, setEditedUser] = useState(props.user);
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
    console.log(mappedAnswerArray);
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
                        {answersArray.map((answer) => {
                            return (
                                <tr key={answer[0]}>
                                    <td>question will go here</td>
                                    <td>correct answer will go here</td>
                                    <td>{answer[1].answerID}</td>
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
