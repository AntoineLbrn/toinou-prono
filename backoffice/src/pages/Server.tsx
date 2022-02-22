import React, { FC } from 'react';
import { useParams } from 'react-router';
import Header from '../components/header/Header';
import ServerDetail from '../components/serverDetail/ServerDetail';

interface ServerParams {
    serverId: string;
} 

const Server: FC = () => {
    const { serverId } = useParams<ServerParams>();
    
    return serverId ? <>
        <Header />
        <ServerDetail serverId={serverId} />
    </> : <></>;
}

export default Server;
