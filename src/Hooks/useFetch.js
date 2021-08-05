import jsonToFormData from '../Components/Utilities/formData';

const fetchApi = async (url, options = {}) => {
    if ('method' in options && options.method === 'POST') {
        options.body = jsonToFormData(options.body);
    }
    let response = await fetch(process.env.REACT_APP_BASE_URL + url, options);
    let data = await response.json();
    return data;
};

export default fetchApi;
