import { getToken, removeToken } from "../utils/session";

const post = async (url: string, body: any) => {
    const rawResponse = await fetch(`http://${process.env.REACT_APP_API_URL}/${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${getToken()}`,
        },
        body: JSON.stringify(body)
    })
    if (!rawResponse.ok) {
        if (rawResponse.status === 401 && rawResponse.statusText === "invalid token") removeToken();
        throw new Error(rawResponse.statusText);
    };
    return rawResponse.json();
}

export default post;
