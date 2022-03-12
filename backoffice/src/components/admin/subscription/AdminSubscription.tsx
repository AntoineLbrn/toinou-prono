import { Box, Container, Heading, Skeleton, Table, TableCaption, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import React, { FC, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import getSubscription from '../../../api/subscriptions/getSubsciption';
import { useInput } from '../../../hooks/useInput';
import CustomSkeleton from '../../generic/CustomSkeleton';
import AdminSubscriptionForm from './AdminSubscriptionForm';

interface AdminSubscriptionProps {
    id: string
}
const AdminSubscription: FC<AdminSubscriptionProps> = ({ id }: AdminSubscriptionProps) => {
    const { data: subscription, refetch, error, isLoading } = useQuery('getSubscription' ,() => getSubscription(id));

    return <Container maxW="container.xl">
        <CustomSkeleton error={error} isLoaded={!isLoading}>
            <Heading my="50px" textAlign="center">{subscription?.server.discordServerNameUsedToBe} - {subscription?.tournament.label}</Heading>
            {subscription && <AdminSubscriptionForm subscription={subscription} refetch={refetch} />}
        </CustomSkeleton>
  </Container>;
}

export default AdminSubscription;
