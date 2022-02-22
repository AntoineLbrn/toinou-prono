import { StackDivider, Box, Spacer, Container, HStack, Heading, Flex, VStack, Button, useDisclosure, Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Icon, Skeleton, Center } from '@chakra-ui/react';
import React, { FC, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import getServerDetail from '../../api/servers/getServerDetail';
import ServerTournamentSubscription from '../../models/ServerTournamentSubscription';
import { canModerateServerTournaments } from '../../utils/permissions';
import ServerAsAvatar from '../servers/ServerAsAvatar';
import AvailableTournamentList from './AvailableTournamentList';
import TournamentItem from './TournamentItem';

interface ServerDetailProps {
    serverId: string;
}

const ServerDetail: FC<ServerDetailProps> = ({serverId}: ServerDetailProps) => {
    const { data, refetch } = useQuery('getServerDetail', () => getServerDetail(serverId));
    const [alreadyJoinedTournamentsIds, setAlreadyJoinedTournamentsIds ] = useState<string[]>([]);

    useEffect(() => {
        if (data) {
            setAlreadyJoinedTournamentsIds(data.server.subscribedTournaments.map((subscribtion) => subscribtion.tournament.id));
        }
    }, [data])
    
    return <Skeleton isLoaded={!!data}>
            {data && <Box>
                <Container mt="50px" maxW="container.lg" boxShadow="0 0 .2rem #fff, 0 0 .2rem #fff" bgColor="#1E2F3D">
                    <Container py="30px" maxW="container.lg"> 
                        <Center><ServerAsAvatar server={data.discordServer}/></Center>
                        <Heading pb="20px" fontSize="3xl" color="#ECE6D6" >{data.discordServer.name}</Heading>
                        <Heading pb="50px" fontWeight="500" fontSize="lg" color="#ECE6D6">Configure les tournois de ton serveur et rejoins-en des nouveaux</Heading>
                        <Center>Tournois rejoints</Center>
                        <Accordion allowToggle={true} w="100%">
                            {data?.server.subscribedTournaments.map((subscription: ServerTournamentSubscription) => {
                                return <TournamentItem key={subscription.id} refetch={refetch} serverTournamentSubscription={subscription} />
                            })}
                        </Accordion>
                        <Center mt="100px">Tournois disponibles</Center>
                        {canModerateServerTournaments(data.discordServer.permissions) && <AvailableTournamentList refetch={refetch} serverId={serverId} alreadyJoinedTournaments={alreadyJoinedTournamentsIds} />}
                    </Container>
                </Container>
            </Box>}
        </Skeleton>
}

export default ServerDetail;
