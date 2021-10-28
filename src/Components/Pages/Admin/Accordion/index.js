import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import AdminModal from '../Modal';
import './style.css';
import getData from '../../../../Hooks/getData';

const TableAccordion = ({ user }) => {
    // Set useState for results, show and questions
    const [questions, setQuestions] = useState(null);
    const [show, setShow] = useState(false);
    const [adminModal, setModal] = useState(null);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    // On mount async and await fetching results and questions from API
    useEffect(async () => {
        setQuestions(await getData('question'));
    }, []);
    useEffect(() => {
        questions
            ? setModal(
                  <AdminModal show={show} setShow={setShow} onHide={handleClose} questions={questions} user={user} />,
              )
            : '';
    }, [questions, show]);
    return (
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header className="accordion">Extra info</Accordion.Header>
                <Accordion.Body>
                    <Table>
                        <thead>
                            <tr>
                                <th>User category</th>
                                <th>Test allocated</th>
                                <th>Score</th>
                                <th>Time allowed(m)</th>
                                <th>Time taken(m)</th>
                                <th>Timer hidden</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{user.category_name}</td>
                                <td>{user.testName}</td>
                                <td>{user.testScore}</td>
                                <td>{parseInt(user.time) / 60}</td>
                                <td>{user.timeTaken}</td>
                                <td>{user.showTimer === '1' ? 'yes' : 'no'}</td>
                                <td>{user.testDate}</td>
                                <td>
                                    <button className="btn adminButton" onClick={handleShow}>
                                        See answers
                                    </button>
                                    {adminModal}
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
};

export default TableAccordion;
