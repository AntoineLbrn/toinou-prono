import { setRole, setToken } from "../utils/session";

const getAccessToken = async (code: string, state: string) => {
    const rawResponse = await fetch(`http://${process.env.REACT_APP_API_URL}/authenticate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            code,
            state
        })
    });
    const token = await rawResponse.json();
    if (!rawResponse.ok) throw token;
    setToken(token.token);
    setRole(token.role);
    
    return token;
}

export default getAccessToken;
