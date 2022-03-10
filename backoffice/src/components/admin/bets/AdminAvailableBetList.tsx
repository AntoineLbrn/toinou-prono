import { Accordion, Box, Container, Heading, HStack, Skeleton, Table, TableCaption, Tbody, Td, Tfoot, Th, Thead, Tr, VStack } from '@chakra-ui/react';
import React, { FC, useEffect, useState } from 'react';
import { Bet } from '../../../models/Bet';
import { Match } from '../../../models/Match';
import AdminBetItem from './AdminBetItem';

interface AdminAvailableBetListProps {
    bets: Bet[]
    refetch: () => void
}
const AdminAvailableBetList: FC<AdminAvailableBetListProps> = ({ bets, refetch }: AdminAvailableBetListProps) => {
    const [sortedBets, setSortedBets] = useState<Bet[]>();

    useEffect(() => {
        setSortedBets(bets.sort((bet1, bet2) => bet1.discordReactionCode - bet2.discordReactionCode));
    }, [bets])
    
    return <Container maxW="container.xl">
        <HStack flexWrap="wrap">            
            {bets.map((bet: Bet) => (
                <AdminBetItem key={bet.id} refetch={refetch} bet={bet} />
            ))}
        </HStack>
  </Container>;
}

export default AdminAvailableBetList;
