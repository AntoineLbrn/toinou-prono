import { Td, Tr } from '@chakra-ui/react';
import React, { FC } from 'react';
import User from '../../../models/User';
import history from '../../../utils/history';

interface AdminUserItemProps {
    user: User
}

const AdminUserItem: FC<AdminUserItemProps> = ({user}: AdminUserItemProps) => {

    return <Tr _hover={{cursor: 'pointer', bgColor:'#1E2F3D'}} onClick={() => history.push(`/admin/user/${user.id}`)} key={user.id}>
        <Td>{user.discordUserId}</Td>
        <Td>{user.isSuperAdmin ? '✅' : '❌'}</Td>
        <Td>{user.tagUsedToBe}</Td>
    </Tr>
}

export default AdminUserItem;
