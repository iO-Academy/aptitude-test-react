import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import fetchApi from '../../../../Hooks/useFetch';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

const AdminModal = () => {
    const [results, setResults] = useState(null);
    const [questions, setQuestions] = useState(null);
    useEffect(async () => {
        await getResults();
        await getQuestions();
    }, []);
    const getResults = async () => {
        let response = await fetchApi(`result`);
        if (response.success) {
            return setResults(response.data);
        }
    };
    const getQuestions = async () => {
        let response = await fetchApi(`question`);
        if (response.success) {
            return setQuestions(response.data);
        }
    };

    return (
        <Modal.Dialog>
            <Modal.Header closeButton>
                <Modal.Title>Answers</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Table className="table mx-auto">
                    <thead>
                        <tr>
                            <th scope="col">Question Number</th>
                            <th scope="col">Question</th>
                            <th scope="col">Correct Answer</th>
                            <th scope="col">Applicant Answer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questions.map((question) => {
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

            <Modal.Footer>
                <Button variant="secondary">Close</Button>
                <Button variant="primary">Save changes</Button>
            </Modal.Footer>
        </Modal.Dialog>
    );
};

export default AdminModal;
