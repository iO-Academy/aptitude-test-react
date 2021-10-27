import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import './style.css';

const TableAccordion = ({ user }) => {
    console.log(user);
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
                                <td>{user.testScore + '/' + user.testLength}</td>
                                <td>{parseInt(user.time) / 60}</td>
                                <td>{user.timeTaken}</td>
                                <td>{user.showTimer === '1' ? 'yes' : 'no'}</td>
                                <td>{user.testDate}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
};

export default TableAccordion;
