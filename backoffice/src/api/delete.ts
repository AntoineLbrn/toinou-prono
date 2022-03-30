import { getToken, removeToken } from "../utils/session";

const deleteRequest = async (url: string) => {
    const rawResponse = await fetch(`${process.env.REACT_APP_API_URL}/${url}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${getToken()}`,
        }
    })
    if (!rawResponse.ok) {
        if (rawResponse.status === 401 && rawResponse.statusText === "invalid token") removeToken();
        throw new Error(rawResponse.statusText);
    };
    return rawResponse.json();
}

export default deleteRequest;
