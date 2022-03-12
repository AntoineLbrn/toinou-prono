import { Button, Icon } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { FaDiscord } from "react-icons/fa";
import { Link } from "react-router-dom";
import generateRandomString from "../../utils/generateRandomString";

const LoginButton: FC = () => {
    const [randomString, setRandomString] = useState<string>('');

    useEffect(() => {
        setRandomString(generateRandomString());
    }, []);

    return <Link target='_blank' to={{pathname: `https://discord.com/api/oauth2/authorize?response_type=code&client_id=${process.env.REACT_APP_DISCORD_CLIENT_ID}&scope=identify%20guilds%20guilds.join&state=${randomString}&redirect_uri=${process.env.REACT_APP_FRONTEND_URL}&prompt=consent`}}>
        <Button bgColor='#7289DA' _hover={{bgColor: '#6178CA'}} color='white'>
            <Icon mr="10px" boxSize='20px' as={FaDiscord} /> Se connecter
        </Button>
    </Link>
}

export default LoginButton;
