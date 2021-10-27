// because it is abstracted here we have control when it occurs - once when component first mounted then whenever
// we choose from that point onwards, thus no infinite recalling.
import fetchApi from './useFetch';

/**
 *  This hook is used to async and await the fetchApi component
 * @param url
 * @returns {Promise<*>}
 */
const getData = async (url) => {
    let response = await fetchApi(url);
    if (response.success) {
        return response.data;
    }
};

export default getData;
