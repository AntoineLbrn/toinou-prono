import { getToken, removeToken } from "../utils/session";

const get = async (url: string) => {
    const rawResponse = await fetch(`http://${process.env.REACT_APP_API_URL}/${url}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${getToken()}`,
        },
    });
    if (!rawResponse.ok) {
        if (rawResponse.status === 401 && rawResponse.statusText === "invalid token") removeToken();
        throw await rawResponse.json;
    };
    return rawResponse.json();
}

export default get;
