/**
 * performs a left join from data 2 onto data 1 based off the keys
 *
 * @param data1 set of data from the fetchAPI that we want to join on to
 * @param data1key1 the key we want to map on to
 * @param data2 set of data from the fetchAPI that we want to join in to data1
 * @param data2key1 the key we're mapping on to data1key1
 * @param data2key2 the key we're joining the value data in from.
 * @returns {*}
 */
const useJoin = ([data1, data1key1], [data2, data2key1, data2key2]) => {
    // maps the users array to a temporary array with the value in user.test_id replaced with the name from the corresponding test
    let newData1 = data1.map((data1Values) => {
        // filters the tests array based on if the test id matches the data1Values test id
        let filteredData2 = data2.filter((data2Values) => {
            return data2Values[data2key1] === data1Values[data1key1];
        });
        data1Values[data1key1] = filteredData2[0][data2key2];
        return data1Values;
    });
    // sets the array constructed in newData1 to the variable newUsers
    return newData1;
};

export default useJoin;
