import { Box, HStack } from '@chakra-ui/react';
import React, { FC, useState } from 'react';
import { useParams } from 'react-router';
import AdminContent from '../components/admin/AdminContent';
import AdminMenu from '../components/admin/AdminMenu';
import AdminUserDetail from '../components/admin/users/AdminUserDetail';
import Header from '../components/header/Header';
import AdminProvider from '../utils/AdminProvider';

interface AdminUserDetailParams {
    id: string;
} 

const AdminUserDetailPage: FC = () => {
    const { id } = useParams<AdminUserDetailParams>();
    
    return <>
        <Header />
        <AdminProvider>
            <AdminMenu />
            <AdminContent>
                <AdminUserDetail id={id} />
            </AdminContent>
        </AdminProvider>
    </>;
}

export default AdminUserDetailPage;
