import Table from 'react-bootstrap/Table';
import TableAccordion from '../Accordion';
import './style.css';
import React from 'react';
import { useEffect, useState } from 'react';
import getData from '../../../../Hooks/getData';
import useJoin from '../../../../Hooks/useJoin';

const UserTable = ({ users }) => {
    //initial state of the tests is null until tests is populated
    const [results, setResults] = useState(null);
    const [editedUsers, setEditedUsers] = useState(users);
    // the use effect hook is passed a 2nd param of [], ensuring it only runs once when the component is first mounted
    useEffect(async () => {
        // common error: the code calling the API is often placed directly in here - abstracting it into its own
        // function (getUsers) is key to this pattern working
        await setResults(await getData('result'));
    }, []);
    const calcPercentage = (id) => {
        if (results) {
            let resultScore = results.filter((result) => {
                return result.id === id;
            });
            if (resultScore.length !== 0) {
                return Math.round((resultScore[0].score / resultScore[0].testLength) * 100);
            } else {
                return '';
            }
        }
    };
    const makePercentageClass = (percentage) => {
        if (percentage === '') {
            return 'table-light';
        } else if (percentage === 100) {
            return 'perfect';
        } else if (percentage >= 70) {
            return 'pass';
        } else percentage >= 0;
        return 'fail';
    };
    useEffect(() => {
        if (results) {
            let resultsDate = useJoin([users, 'id', 'testDate'], [results, 'id', 'dateCreated']).map((user) => {
                let userTestDateArray = user.testDate.split(':');
                userTestDateArray.pop();
                user.testDate = userTestDateArray.join(':');
                return user;
            });
            let resultsScore = useJoin([resultsDate, 'id', 'testScore'], [results, 'id', 'score']);
            let resultsAnswers = useJoin([resultsScore, 'id', 'answers'], [results, 'resultId', 'answers']);
            setEditedUsers(useJoin([resultsAnswers, 'id', 'timeTaken'], [results, 'id', 'time']));
        }
    }, [results, users]);
    return (
        <Table className="table table-borderless mx-auto">
            <thead className="tableHead table-light">
                <tr className="border-3 border-top-0 border-end-0 border-start-0">
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Percentage(%)</th>
                </tr>
            </thead>
            <tbody className="tableBody">
                {editedUsers.map((user) => {
                    return user.isAdmin === '1' ? (
                        <React.Fragment key={user.id + 'admin'}></React.Fragment>
                    ) : (
                        <React.Fragment key={user.id}>
                            <tr className={makePercentageClass(calcPercentage(user.id)) + ' border-top'} key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{calcPercentage(user.id)}</td>
                            </tr>
                            <tr className={makePercentageClass(calcPercentage(user.id))} key={user.id + 'a'}>
                                <td colSpan={3}>
                                    <TableAccordion user={user} />
                                </td>
                            </tr>
                        </React.Fragment>
                    );
                })}
            </tbody>
        </Table>
    );
};

export default UserTable;
