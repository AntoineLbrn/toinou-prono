import { Accordion, Box, Container, Heading, Skeleton, Table, TableCaption, Tbody, Td, Tfoot, Th, Thead, Tr, VStack } from '@chakra-ui/react';
import React, { FC, useEffect, useState } from 'react';
import { Match } from '../../../models/Match';
import AdminMatchItem from './AdminMatchItem';

interface AdminMatchListProps {
    matches: Match[]
    refetch: () => void
}
const AdminMatchList: FC<AdminMatchListProps> = ({ matches, refetch }: AdminMatchListProps) => {

    return <Container maxW="container.xl">
        <VStack spacing="20px">
            <Accordion allowToggle={true} w="100%">
                {matches.map((match: Match) =>
                    <AdminMatchItem key={match.id} match={match} refetch={refetch}/>
                )}
            </Accordion>
        </VStack>
  </Container>;
}

export default AdminMatchList;
