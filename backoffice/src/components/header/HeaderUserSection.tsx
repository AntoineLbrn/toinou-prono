import React, { FC, useEffect, useState } from 'react';
import { Avatar, AvatarBadge, AvatarGroup, Button, Heading, IconButton, Link, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import getCurrentUser from '../../api/users/getCurrentUser';
import DiscordUser from '../../models/DiscordUser';
import { logout } from '../../utils/session';
import { useQuery } from 'react-query';
import LoginButton from '../generic/LoginButton';

const HeaderUserSection: FC = () => {
    const [hovered, setHovered] = useState<boolean>(false);
    const { data: user } = useQuery<DiscordUser>(
        'getCurrentUser',
        getCurrentUser
    );
    return user 
    ? <Menu>
        <MenuButton 
            onMouseEnter={() => setHovered(true)} 
            onMouseLeave={() => setHovered(false)}  
            cursor={hovered ? 'pointer' : ''}  
        >
            <Avatar name={user.username} backgroundColor={hovered ? 'rgba(255,255,255,0.3)' : 'transparent'} src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`} />
        </MenuButton>
        <MenuList>
            <MenuItem onClick={() => logout()}>🔓 Déconnexion</MenuItem>
        </MenuList>
    </Menu>
    : <LoginButton />
}

export default HeaderUserSection;
