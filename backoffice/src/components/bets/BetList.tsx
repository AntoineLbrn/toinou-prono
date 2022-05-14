import { CheckCircleIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { StackDivider, Box, Spacer, Container, HStack, Flex, VStack, Button, useDisclosure, Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Icon, Menu, MenuButton, MenuItem, MenuList, Table, Tbody, Td, Th, Thead, Tr, Skeleton } from '@chakra-ui/react';
import React, { FC, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import getCurrentUserParticipations from '../../api/userTournamentParticipations/getCurrentUserParticipations';
import { UserTournamentParticipation } from '../../models/UserTournamentParticipation';
import CustomSkeleton from '../generic/CustomSkeleton';
import UserTournamentParticipationBox from '../participation/ParticipationBox';

interface BetListProps {
    tournamentId?: string
}

const BetList: FC<BetListProps> = ({tournamentId}: BetListProps) => {
    const { data: userTournamentParticipations, refetch, error, isLoading } = useQuery<UserTournamentParticipation[]>(
        'getCurrentUserParticipations',
        () => getCurrentUserParticipations()
    );

    return <CustomSkeleton w="100%" h="100vh" error={error} isLoaded={!isLoading}>
        <Flex mt='30px' alignContent="flex-start" alignItems="flex-start" direction='row' mx="3%" flexWrap="wrap">
            {userTournamentParticipations?.map((participation) => (
                <UserTournamentParticipationBox 
                    refetch={refetch}
                    key={participation.id}  
                    participation={participation}
                    highlighted={tournamentId === participation.tournament.id} 
                />
            ))}
        </Flex>
    </CustomSkeleton>
}

export default BetList;
