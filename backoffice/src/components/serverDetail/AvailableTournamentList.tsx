import { StackDivider, Box, Spacer, Container, HStack, Heading, Flex, VStack, Button, useDisclosure, Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Icon, Skeleton, Center } from '@chakra-ui/react';
import React, { FC, useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router';
import getServerDetail from '../../api/servers/getServerDetail';
import getAllTournaments from '../../api/tournaments/getAllTournaments';
import subscribeServerToTournament from '../../api/tournaments/subscribeServerToTournament';
import ServerTournamentSubscription from '../../models/ServerTournamentSubscription';
import Tournament from '../../models/Tournament';
import ServerAsAvatar from '../servers/ServerAsAvatar';
import TournamentItem from './TournamentItem';

interface AvailableTournamentListProps {
    alreadyJoinedTournaments: string[];
    serverId: string;
    refetch: () => void;
}

const AvailableTournamentList: FC<AvailableTournamentListProps> = ({alreadyJoinedTournaments, serverId, refetch}: AvailableTournamentListProps) => {
    const { data } = useQuery('getAllTournaments', getAllTournaments);
    const [tournaments, setTournaments] = useState<Tournament[]>([]);
    const mutation = useMutation((tournamentId: string) => subscribeServerToTournament(serverId, tournamentId), {
        onSuccess: refetch
    });    
    useEffect(() => {
        if (data && alreadyJoinedTournaments) {
            setTournaments(data.filter((tournament) => !alreadyJoinedTournaments.includes(tournament.id)));
        }
    }, [data, alreadyJoinedTournaments])
    
    return <Skeleton isLoaded={!!data}>
            <Accordion allowToggle={true} w="100%">
                {tournaments.map((tournament: Tournament) => {
                    return <AccordionItem key={tournament.id} borderColor="gray.200" py="10px">
                    <AccordionButton>
                        <Flex color="#ECE6D6" alignItems="center" w="100%">
                            <Heading ml="20px" fontSize="lg">{tournament.label} ({tournament.description})</Heading>
                            <Spacer />
                            <AccordionIcon h="100%"/>
                        </Flex>
                    </AccordionButton>
                    <AccordionPanel color="white" pb={4}>
                        <Button type="submit" onClick={() => mutation.mutate(tournament.id)}>{mutation.isLoading ? '...' : 'Ajouter au serveur'}</Button>
                    </AccordionPanel>
                </AccordionItem>
                })}
            </Accordion>
        </Skeleton>
}

export default AvailableTournamentList;
