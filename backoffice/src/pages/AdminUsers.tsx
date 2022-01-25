import { Box, HStack } from '@chakra-ui/react';
import React, { FC } from 'react';
import AdminContent from '../components/admin/AdminContent';
import AdminMenu from '../components/admin/AdminMenu';
import AdminUsersList from '../components/admin/users/AdminUsersList';
import Header from '../components/header/Header';
import AdminProvider from '../utils/AdminProvider';

const AdminUsers: FC = () => {
    return <>
        <Header />
        <AdminProvider>
            <AdminMenu />
            <AdminContent>
                <AdminUsersList />
            </AdminContent>
        </AdminProvider>
    </>;
}

export default AdminUsers;
