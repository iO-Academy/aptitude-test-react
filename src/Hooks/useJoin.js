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
const useJoin = ([data1, data1key1, data1key2], [data2, data2key1, data2key2]) => {
    // maps the data1 array to an array with the value in data1.data1key1 replaced with the value with key data2key2 from the corresponding data2key1
    return data1.map((data1Values) => {
        // filters the data2 array based on if data2key1 matches the data1Values data1key1
        let filteredData2 = data2.filter((data2Values) => {
            return data2Values[data2key1] === data1Values[data1key1];
        });
        if (filteredData2[0]) {
            data1Values[data1key2] = filteredData2[0][data2key2];
            return data1Values;
        }
        data1Values[data1key2] = '';
        return data1Values;
    });
};

export default useJoin;
