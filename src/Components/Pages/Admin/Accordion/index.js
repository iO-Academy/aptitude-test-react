import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import './style.css';

const TableAccordion = ({ user }) => {
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
                                <th>time allowed(m)</th>
                                <th>timer hidden</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{user.category_name}</td>
                                <td>{user.testName}</td>
                                <td>{parseInt(user.time) / 60}</td>
                                <td>{user.showTimer === '1' ? 'yes' : 'no'}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
};

export default TableAccordion;
