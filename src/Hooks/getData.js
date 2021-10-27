// because it is abstracted here we have control when it occurs - once when component first mounted then whenever
// we choose from that point onwards, thus no infinite recalling.
import fetchApi from './useFetch';

const getData = async (url) => {
    let response = await fetchApi(url);
    if (response.success) {
        return response.data;
    }
};

export default getData;
