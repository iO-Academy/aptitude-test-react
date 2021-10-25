import Accordion from 'react-bootstrap/Accordion';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';

const TableAccordion = (props) => {
    return (
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Extra info</Accordion.Header>
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
                                <td>{props.userCategory}</td>
                                <td>{props.testAllocated}</td>
                                <td>{props.timeAllowed}</td>
                                <td>{props.timerHidden}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
};

export default TableAccordion;
