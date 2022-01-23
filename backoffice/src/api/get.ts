const get = async (url: string) => {
    const rawResponse = await fetch(`http://${process.env.REACT_APP_API_URL}/${url}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    });
    return rawResponse.json();
}

export default get;
