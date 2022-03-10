import { Box, HStack } from '@chakra-ui/react';
import React, { FC, useState } from 'react';
import { useParams } from 'react-router';
import AdminContent from '../components/admin/AdminContent';
import AdminMenu from '../components/admin/AdminMenu';
import AdminServersList from '../components/admin/servers/AdminServersList';
import AdminSubscription from '../components/admin/subscription/AdminSubscription';
import AdminTournamentEdit from '../components/admin/tournaments/AdminTournamentEdit';
import Header from '../components/header/Header';
import AdminProvider from '../utils/AdminProvider';

interface AdminTournamentEditParams {
    id: string;
} 

const TournamentEdit: FC = () => {
    const { id } = useParams<AdminTournamentEditParams>();
    
    return <>
        <Header />
        <AdminProvider>
            <AdminMenu />
            <AdminContent>
                <AdminTournamentEdit id={id} />
            </AdminContent>
        </AdminProvider>
    </>;
}

export default TournamentEdit;
