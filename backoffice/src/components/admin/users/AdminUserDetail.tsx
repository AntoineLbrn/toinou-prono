import { Container, Heading, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import React, { FC } from 'react';
import { useQuery } from 'react-query';
import getUser from '../../../api/users/getUser';
import getUserById from '../../../api/users/getUserById';
import User from '../../../models/User';

interface AdminUserDetailProps {
    id: string
}

const AdminUserDetail: FC<AdminUserDetailProps> = ({id}: AdminUserDetailProps) => {
    const { data, error, isLoading } = useQuery<User>(
        'getUser',
        () => getUserById(id, ['participations', 'participations.votes', 'participations.votes.bet', 'participations.votes.bet.match', 'participations.tournament'])
    );
    
    return <Container maxW="container.xl">
        <Heading>Votes récents</Heading>
        <Table mt="50px" color="white" colorScheme="pink" variant='simple'>
            <Thead>
                <Tr>
                    <Th color="whiteAlpha.700">Tournoi</Th>
                    <Th color="whiteAlpha.700">Match</Th>
                    <Th color="whiteAlpha.700">Pari</Th>
                    <Th color="whiteAlpha.700">Date du match</Th>
                </Tr>
            </Thead>
            <Tbody>
                {data?.participations.map((participation) => (
                    participation.votes.map((vote) => (
                    <Tr key={vote.id}>
                        <Td>{participation.tournament.label}</Td>
                        <Td>{vote.bet.match.label}</Td>
                        <Td>{vote.bet.label}</Td>
                        <Td>{new Date(vote.bet.match.date).toLocaleDateString('fr', {weekday: 'long', day: 'numeric', month: 'long' })}</Td>
                    </Tr>
                    ))
                ))}
            </Tbody>
        </Table>
</Container>
}

export default AdminUserDetail;
