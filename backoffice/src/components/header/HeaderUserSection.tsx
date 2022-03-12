import React, { FC, useEffect, useState } from 'react';
import { Avatar, AvatarBadge, AvatarGroup, Button, Heading, IconButton, Link, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import generateRandomString from '../../utils/generateRandomString';
import getCurrentUser from '../../api/users/getCurrentUser';
import DiscordUser from '../../models/DiscordUser';
import { logout } from '../../utils/session';
import { useQuery } from 'react-query';

const HeaderUserSection: FC = () => {
    const [randomString, setRandomString] = useState<string>('');
    const [hovered, setHovered] = useState<boolean>(false);
    useEffect(() => {
        setRandomString(generateRandomString());
    }, []);
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
    : <Link 
        _hover={{textDecoration: "none"}}
        href={`https://discord.com/api/oauth2/authorize?response_type=code&client_id=${process.env.REACT_APP_DISCORD_CLIENT_ID}&scope=identify%20guilds%20guilds.join&state=${randomString}&redirect_uri=${process.env.REACT_APP_FRONTEND_URL}&prompt=consent`}
        >
            <Button bgColor="#ECE6D6" _hover={{bgColor: "#FDF7E7"}}>
                Se connecter
            </Button>
        </Link>
}

export default HeaderUserSection;
