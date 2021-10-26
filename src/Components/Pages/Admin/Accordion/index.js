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
                                <th>user category</th>
                                <th>test allocated</th>
                                <th>time allowed</th>
                                <th>timer hidden</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{props.user.category_name}</td>
                                <td>{props.user.testName}</td>
                                <td>{props.user.time}</td>
                                <td>{props.user.showTimer}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
};

export default TableAccordion;