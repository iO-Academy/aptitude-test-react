const fetchApi = async (url, options = {}) => {
    let response = await fetch(process.env.REACT_APP_BASE_URL + url, options);
    let data = await response.json();
    return data;
};

export default fetchApi;
