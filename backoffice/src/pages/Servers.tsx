import React, { FC } from 'react';
import Header from '../components/header/Header';
import ServerList from '../components/servers/ServerList';

const Servers: FC = () => {
    return <>
        <Header />
        <ServerList />
    </>;
}

export default Servers;
