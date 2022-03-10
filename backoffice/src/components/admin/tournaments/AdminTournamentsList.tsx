import { ChevronDownIcon } from '@chakra-ui/icons';
import { Box, Container, Menu, MenuButton, MenuItem, MenuList, Table, Text, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import React, { FC, useEffect, useState } from 'react';
import getAllTournaments from '../../../api/tournaments/getAllTournaments';
import Tournament from '../../../models/Tournament';
import history from '../../../utils/history';

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
                    <Th color="whiteAlpha.700">Serveurs participants</Th>
                </Tr>
            </Thead>
            <Tbody>
            {tournaments?.map((tournament) => (
                <Tr onClick={() => history.push(`/admin/tournaments/edit/${tournament.id}`)} _hover={{cursor: 'pointer', bgColor:'#1E2F3D'}} key={tournament.id}>
                    <Td>{tournament.id}</Td>
                    <Td>{tournament.label}</Td>
                    <Td>{tournament.description}</Td>
                    <Td onClick={(e) => e.stopPropagation()}>
                        <Menu>
                            <MenuButton >
                                <Text fontWeight="bold">Serveurs<ChevronDownIcon /></Text>
                            </MenuButton>
                            <MenuList>
                                {tournament.serversSubscriptions.map((subscription) => (
                                    <MenuItem key={subscription.id} onClick={() => history.push(`/admin/servers/subscription/${subscription.id}`)}>{subscription.server.discordServerNameUsedToBe}</MenuItem>
                                ))}
                            </MenuList>
                        </Menu>
                    </Td>
                </Tr>
            ))}
            </Tbody>
        </Table>
  </Container>;
}

export default AdminTournamentsList;
