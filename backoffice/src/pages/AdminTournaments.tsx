import { Box, HStack } from '@chakra-ui/react';
import React, { FC } from 'react';
import AdminContent from '../components/admin/AdminContent';
import AdminMenu from '../components/admin/AdminMenu';
import AdminTournamentsList from '../components/admin/tournaments/AdminTournamentsList';
import Header from '../components/header/Header';
import AdminProvider from '../utils/AdminProvider';

const AdminTournaments: FC = () => {
    return <>
        <Header />
        <AdminProvider>
            <AdminMenu />
            <AdminContent>
                <AdminTournamentsList />
            </AdminContent>
        </AdminProvider>
    </>;
}

export default AdminTournaments;
