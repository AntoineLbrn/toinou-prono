import { Box, Container, Heading, Skeleton, Table, TableCaption, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import React, { createContext, FC, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import getTournament from '../../../api/tournaments/getTournament';
import CustomSkeleton from '../../generic/CustomSkeleton';
import { AdminEditTournamentContextProvider } from './AdminEditTournamentContext';
import AdminEditTournamentForm from './AdminEditTournamentForm';

interface AdminTournamentEditProps {
    id: string
}
const AdminTournamentEdit: FC<AdminTournamentEditProps> = ({ id }: AdminTournamentEditProps) => {
    const { data: tournament, refetch, isLoading, error } = useQuery('getTournament', () => getTournament(id));

    return <AdminEditTournamentContextProvider>
            <Container maxW="container.xl">
                <CustomSkeleton error={error} isLoaded={!isLoading}>
                    <Heading my="50px" textAlign="center">[ÉDITION] {tournament?.label}</Heading>
                    {tournament && <AdminEditTournamentForm tournament={tournament} refetch={refetch} />}
                </CustomSkeleton>
        </Container>
    </AdminEditTournamentContextProvider>
}

export default AdminTournamentEdit;
