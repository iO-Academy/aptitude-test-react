//Import Modal and Table components from react-bootstrap
import { Modal } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

// Create an AdminModal component
const AdminModal = (props) => {
    // Set the component return to give modal content
    let answersArray = [];
    if (props.user.answers !== '' && typeof props.user.answers !== 'undefined') {
        answersArray = Object.entries(JSON.parse(JSON.parse(props.user.answers)));
    }
    return (
        <Modal size="xl" show={true} onHide={props.onHide}>
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
                            <th scope="col">Question Number</th>
                            <th scope="col">Question</th>
                            <th scope="col">Correct Answer</th>
                            <th scope="col">Applicant Answer</th>
                        </tr>
                    </thead>
                    {/* Map the questions and answers onto the modal table */}
                    <tbody>
                        {answersArray.map((answer, key) => {
                            return (
                                <tr key={key}>
                                    <td>{key}</td>
                                    <td>question will go here</td>
                                    <td>correct answer will go here</td>
                                    <td>{answer.answerID}</td>
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
