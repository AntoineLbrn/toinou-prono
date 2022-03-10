import { Box, HStack } from '@chakra-ui/react';
import React, { FC } from 'react';
import AdminContent from '../components/admin/AdminContent';
import AdminMenu from '../components/admin/AdminMenu';
import AdminServersList from '../components/admin/servers/AdminServersList';
import Header from '../components/header/Header';
import AdminProvider from '../utils/AdminProvider';

const AdminServers: FC = () => {
    return <>
        <Header />
        <AdminProvider>
            <AdminMenu />
            <AdminContent>
                <AdminServersList />
            </AdminContent>
        </AdminProvider>
    </>;
}

export default AdminServers;
