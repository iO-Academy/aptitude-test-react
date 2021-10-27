import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import AdminModal from '../Modal';
import fetchApi from '../../../../Hooks/useFetch';
import './style.css';

const TableAccordion = (props) => {
    // Set useState for results, show and questions
    const [results, setResults] = useState(null);
    const [questions, setQuestions] = useState(null);
    const [show, setShow] = useState(false);
    const [adminModal, setModal] = useState(null);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    // On mount async and await fetching results and questions from API
    useEffect(async () => {
        await getResults();
        await getQuestions();
    }, []);
    // Make the functionality to fetch results and questions from the API
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
    useEffect(() => {
        questions && results
            ? setModal(
                  <AdminModal
                      show={show}
                      setShow={setShow}
                      onHide={handleClose}
                      results={results}
                      questions={questions}
                  />,
              )
            : '';
    }, [questions, results]);
    return (
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header className="accordion">Extra info</Accordion.Header>
                <Accordion.Body>
                    <Table>
                        <thead>
                            <tr>
                                <th>user category</th>
                                <th>test allocated</th>
                                <th>time allowed</th>
                                <th>timer hidden</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{props.user.category_name}</td>
                                <td>{props.user.testName}</td>
                                <td>{props.user.time}</td>
                                <td>{props.user.showTimer}</td>
                                <td>{props.user.score}</td>
                                <td>
                                    <button onClick={handleShow}>See answers</button>
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
