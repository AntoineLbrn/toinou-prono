import React, { FC } from 'react';
import Header from '../components/header/Header';
import ServerList from '../components/servers/ServerList';
import TournamentList from '../components/tournaments/TournamentList';

const Tournaments: FC = () => {
    return <>
        <Header />
        <TournamentList />
    </>;
}

export default Tournaments;
