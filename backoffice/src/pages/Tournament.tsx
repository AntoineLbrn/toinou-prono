import React, { FC } from 'react';
import { useParams } from 'react-router';
import Header from '../components/header/Header';
import TournamentDetail from '../components/tournaments/TournamentDetail';

interface TournamentParams {
    tournamentId: string;
} 

const Server: FC = () => {
    const { tournamentId } = useParams<TournamentParams>();
    
    return tournamentId ? <>
        <Header />
        <TournamentDetail tournamentId={tournamentId} />
    </> : <></>;
}

export default Server;
