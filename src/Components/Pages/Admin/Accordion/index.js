import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import './style.css';

const TableAccordion = (props) => {
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
                                <td>{props.user.category_name}</td>
                                <td>{props.user.testName}</td>
                                <td>{props.user.testScore}</td>
                                <td>{props.user.time}</td>
                                <td>{props.user.timeTaken}</td>
                                <td>{props.user.showTimer}</td>
                                <td>{props.user.testDate}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
};

export default TableAccordion;
