import { ArrowDownIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { Box, Button, Container, Menu, MenuButton, MenuItem, MenuList, Table, Text, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import React, { FC, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import getAllServers from '../../../api/servers/getAllServers';
import Server from '../../../models/Server';
import history from '../../../utils/history';
import CustomSkeleton from '../../generic/CustomSkeleton';

const AdminServersList: FC = () => {
    const { data: servers, error, isLoading } = useQuery<Server[]>(
        'getAllServers',
        getAllServers
    );

    return <CustomSkeleton error={error} isLoaded={!isLoading}> 
        <Container maxW="container.xl">
            <Table color="white" colorScheme="pink" variant='simple'>
                <Thead>
                    <Tr>
                        <Th color="whiteAlpha.700">ID</Th>
                        <Th color="whiteAlpha.700">Nom du serveur</Th>
                        <Th color="whiteAlpha.700">DiscordServerId</Th>
                        <Th color="whiteAlpha.700">Tournois rejoints</Th>
                    </Tr>
                </Thead>
                <Tbody>
                {servers?.map((server) => (
                    <Tr _hover={{cursor: 'pointer', bgColor:'#1E2F3D'}} key={server.id}>
                        <Td>{server.id}</Td>
                        <Td>{server.discordServerNameUsedToBe}</Td>
                        <Td>{server.discordServerId}</Td>
                        <Td>
                            <Menu>
                                <MenuButton>
                                    <Text fontWeight="bold">Compétitions <ChevronDownIcon /></Text>
                                </MenuButton>
                                <MenuList>
                                    {server.subscribedTournaments.map((subscription) => (
                                        <MenuItem key={subscription.id} onClick={() => history.push(`/admin/servers/subscription/${subscription.id}`)}>{subscription.tournament.label}</MenuItem>
                                    ))}
                                </MenuList>
                            </Menu>
                        </Td>
                    </Tr>
                ))}
                </Tbody>
            </Table>
        </Container>
    </CustomSkeleton>
}

export default AdminServersList;
