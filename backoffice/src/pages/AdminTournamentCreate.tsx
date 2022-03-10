import { Box, HStack } from '@chakra-ui/react';
import React, { FC } from 'react';
import AdminContent from '../components/admin/AdminContent';
import AdminMenu from '../components/admin/AdminMenu';
import AdminTournamentCreate from '../components/admin/tournaments/AdminTournamentCreate';
import Header from '../components/header/Header';
import AdminProvider from '../utils/AdminProvider';

const AdminTournament: FC = () => {
    return <>
        <Header />
        <AdminProvider>
            <AdminMenu />
            <AdminContent>
                <AdminTournamentCreate />
            </AdminContent>
        </AdminProvider>
    </>;
}

export default AdminTournament;
