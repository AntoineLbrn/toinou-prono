import { Box, HStack } from '@chakra-ui/react';
import React, { FC } from 'react';
import AdminContent from '../components/admin/AdminContent';
import AdminMenu from '../components/admin/AdminMenu';
import AdminUsersList from '../components/admin/uesrs/AdminUsersList';
import Header from '../components/header/Header';

const AdminUsers: FC = () => {
    return <>
        <Header />
        <AdminMenu />
        <AdminContent>
            <AdminUsersList />
        </AdminContent>
    </>;
}

export default AdminUsers;
