import React, { FC } from 'react';
import { useParams } from 'react-router';
import BetList from '../components/bets/BetList';
import Header from '../components/header/Header';

interface MyBetsParams {
    tournamentId?: string;
} 

const MyBets: FC = () => {
    const { tournamentId } = useParams<MyBetsParams>();

    return <>
        <Header />
        <BetList tournamentId={tournamentId} />
    </>;
}

export default MyBets;
