import { FC, useEffect } from "react";
import { useQuery } from "react-query";
import getAccessToken from "../api/getAccessToken";
import { getToken } from "./session";

const SessionProvider: FC = (props) => {
    const query = new URLSearchParams(window.location.search);
    const code = query.get('code');
    const state = query.get('state');
    const { data: token } = useQuery(
        'getAccessToken',
        () => getAccessToken(code ? code : '', state ? state : ''),
        {
            enabled: !!code && !!state,
        }
    );

    useEffect(() => {
        if (token) window.location.reload();
    },[token]);
    return <>{props.children}</>;
}

export default SessionProvider;
