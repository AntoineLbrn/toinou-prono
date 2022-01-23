import { Box, Container, Table, TableCaption, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import React, { FC, useEffect, useState } from 'react';
import getAllUsers from '../../../api/users/getAllUsers';
import User from '../../../models/User';

const Home: FC = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        getAllUsers().then((data) => {
            setUsers(data);
        });
    }, [])

    return <Container maxW="container.xl">
        <Table color="white" colorScheme="pink" variant='simple'>
            <Thead>
                <Tr>
                    <Th color="whiteAlpha.700">Discord ID</Th>
                    <Th color="whiteAlpha.700">Admin</Th>
                    <Th color="whiteAlpha.700">Tag discord</Th>
                </Tr>
            </Thead>
            <Tbody>
            {users?.map((user) => (
                <Tr key={user.id}>
                    <Td>{user.discordUserId}</Td>
                    <Td>{user.isSuperAdmin ? '✅' : '❌'}</Td>
                    <Td>{user.tagUsedToBe}</Td>
                </Tr>
            ))}
            </Tbody>
        </Table>
  </Container>;
}

export default Home;
