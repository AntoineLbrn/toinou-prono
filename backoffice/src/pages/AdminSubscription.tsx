import { Box, HStack } from '@chakra-ui/react';
import React, { FC, useState } from 'react';
import { useParams } from 'react-router';
import AdminContent from '../components/admin/AdminContent';
import AdminMenu from '../components/admin/AdminMenu';
import AdminServersList from '../components/admin/servers/AdminServersList';
import AdminSubscription from '../components/admin/subscription/AdminSubscription';
import Header from '../components/header/Header';
import AdminProvider from '../utils/AdminProvider';

interface AdminSubscriptionParams {
    id: string;
} 

const AdminSubscriptionPage: FC = () => {
    const { id } = useParams<AdminSubscriptionParams>();
    
    return <>
        <Header />
        <AdminProvider>
            <AdminMenu />
            <AdminContent>
                <AdminSubscription id={id} />
            </AdminContent>
        </AdminProvider>
    </>;
}

export default AdminSubscriptionPage;
