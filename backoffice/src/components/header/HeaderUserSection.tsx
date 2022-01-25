import React, { FC, useEffect, useState } from 'react';
import { Button, Heading, Link, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import generateRandomString from '../../utils/generateRandomString';
import getCurrentUser from '../../api/users/getCurrentUser';
import User from '../../models/User';
import DiscordUser from '../../models/DiscordUser';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { getToken, logout } from '../../utils/session';

const HeaderLogo: FC = () => {
    const token = getToken();
    const [user, setUser] = useState<DiscordUser>();
    const [randomString, setRandomString] = useState<string>('');
    useEffect(() => {
        setRandomString(generateRandomString());
        if (token) {
            getCurrentUser().then((data) => {
                setUser(data);
            });
        }
    }, []);

    return token 
    ? <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            {user?.username}
        </MenuButton>
        <MenuList>
            <MenuItem onClick={() => logout()}>Déconnexion</MenuItem>
        </MenuList>
    </Menu>
    : <Link 
        href={`https://discord.com/api/oauth2/authorize?response_type=code&client_id=746410404959223919&scope=identify%20guilds.join&state=${randomString}&redirect_uri=${process.env.REACT_APP_FRONTEND_URL}&prompt=consent`}
        >
            <Button>
                Se connecter
            </Button>
        </Link>
}

export default HeaderLogo;
