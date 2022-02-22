import { Box, Container, Table, TableCaption, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import React, { FC, useEffect, useState } from 'react';
import getAllTournaments from '../../../api/tournaments/getAllTournaments';
import getAllUsers from '../../../api/users/getAllUsers';
import Tournament from '../../../models/Tournament';
import User from '../../../models/User';

const AdminTournamentsList: FC = () => {
    const [tournaments, setTournaments] = useState<Tournament[]>([]);

    useEffect(() => {
        getAllTournaments().then((data) => {
            setTournaments(data);
        });
    }, []);

    return <Container maxW="container.xl">
        <Table color="white" colorScheme="pink" variant='simple'>
            <Thead>
                <Tr>
                    <Th color="whiteAlpha.700">ID</Th>
                    <Th color="whiteAlpha.700">Label</Th>
                    <Th color="whiteAlpha.700">Description</Th>
                </Tr>
            </Thead>
            <Tbody>
            {tournaments?.map((tournament) => (
                <Tr _hover={{cursor: 'pointer', bgColor:'#1E2F3D'}} key={tournament.id}>
                    <Td>{tournament.id}</Td>
                    <Td>{tournament.label}</Td>
                    <Td>{tournament.description}</Td>
                </Tr>
            ))}
            </Tbody>
        </Table>
  </Container>;
}

export default AdminTournamentsList;
