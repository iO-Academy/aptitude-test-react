//Import Modal, Button and Table components from react-bootstrap
import { Modal } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

// Create an AdminModal component
const AdminModal = (props) => {
    // Set the component return to give modal content
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
                            <th scope="col">Question Number</th>
                            <th scope="col">Question</th>
                            <th scope="col">Correct Answer</th>
                            <th scope="col">Applicant Answer</th>
                        </tr>
                    </thead>
                    {/* Map the questions and answers onto the modal table */}
                    <tbody>
                        {props.questions.map((question) => {
                            return (
                                <tr key={question.id}>
                                    <td>{question.id}</td>
                                    <td>{question.text}</td>
                                    <td>yi</td>
                                    <td>yi</td>
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
