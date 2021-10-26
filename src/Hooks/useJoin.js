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
