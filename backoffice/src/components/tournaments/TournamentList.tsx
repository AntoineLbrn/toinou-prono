import { CheckCircleIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { StackDivider, Box, Spacer, Container, HStack, Text, Flex, VStack, Button, useDisclosure, Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Icon, Menu, MenuButton, MenuItem, MenuList, Table, Tbody, Td, Th, Thead, Tr, Skeleton } from '@chakra-ui/react';
import React, { FC, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import getAllTournaments from '../../api/tournaments/getAllTournaments';
import { useInput } from '../../hooks/useInput';
import FilterTournamentInput from './FilterTournamentInput';
import { SearchIcon } from '@chakra-ui/icons'
import Tournament from '../../models/Tournament';
import { doesFilterMatch } from '../../utils/doesFilterMatch';
import getCurrentUserParticipations from '../../api/userTournamentParticipations/getCurrentUserParticipations';
import TournamentItem from './TournamentItem';

const TournamentList: FC = () => {
    const { data, refetch, isLoading: isTournamentLoading } = useQuery('getTournaments', getAllTournaments);
    const { data: participations, refetch: refetchParticipations, isLoading: isParticipationsLoading } = useQuery('getUserParticipationsByUser', getCurrentUserParticipations);
    const [tournaments, setTournaments] = useState<Tournament[] | undefined>();
    const {bind: bindFilter, value: filter} = useInput('');

    useEffect(() => {
        setTournaments(data?.filter((tournament) => doesFilterMatch(tournament.label, filter)))
    },[filter, data])
    return <Skeleton isLoaded={!isTournamentLoading && !isParticipationsLoading}>
        <Box>
            <Container mt="50px" maxW="container.lg" boxShadow="0 0 .2rem #fff, 0 0 .2rem #fff" bgColor="#1E2F3D">
                <Container py="30px" maxW="container.lg">
                    <HStack mb='30px'>
                        <SearchIcon />
                        <FilterTournamentInput placeholder='Rechercher une compétition' {...bindFilter} />
                    </HStack>
                    <Table color="white" colorScheme="pink" variant='simple'>
                        <Thead>
                            <Tr>
                                <Th color="whiteAlpha.700">Nom de la compétition</Th>
                                <Th color="whiteAlpha.700">Description</Th>
                                <Th color="whiteAlpha.700">Nombre de matchs</Th>
                                <Th color="whiteAlpha.700">Nombre de participants</Th>
                                <Th color="whiteAlpha.700">Rejoindre</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                        {participations && tournaments?.map((tournament) => (
                            <TournamentItem key={tournament.id} tournament={tournament} participations={participations} refetch={() => {refetch(); refetchParticipations()}} />
                        ))}
                        </Tbody>
                    </Table> 
                </Container>
            </Container>
        </Box>
    </Skeleton>
}

export default TournamentList;
