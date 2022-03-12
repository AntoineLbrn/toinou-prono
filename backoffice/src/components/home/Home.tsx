import { Avatar, Box, Button, Center, Container, Flex, Heading, HStack, Icon, Image, Link, Spacer, VStack } from '@chakra-ui/react';
import React, { FC } from 'react';
import { MdOutlineSportsEsports } from 'react-icons/md';
import background from '../../background-image.jpeg'
import logo from '../../logo.png'
import { getToken } from '../../utils/session';
import { FaDiscord, FaGithub, FaTwitter } from 'react-icons/fa';
import LoginButton from '../generic/LoginButton';

const Home: FC = () => {
    const isLogout = !getToken();

    return <Box h="90%" mt="3px" w="100%" bgSize="cover" bgImage={background}>
        <Container maxW="container.xl">
            <VStack spacing="10vh">
            <HStack pt="10vh" mx="auto" textAlign="center">
                <Heading color="white">Toinou</Heading>
                <Image w="15vw" src={logo} />
                <Heading color="white">Prono</Heading>
            </HStack>
            <Center>
                {isLogout && <LoginButton />}
            </Center>
            <Heading textAlign="center">Crée ou rejoins des tournois de pronostics</Heading>
            <HStack>
                <Avatar icon={<Icon as={FaDiscord} />} />
                <Avatar icon={<Icon as={FaTwitter} />} />
                <Avatar icon={<Icon as={FaGithub} />} />
            </HStack>
            </VStack>
        </Container>
    </Box>
}

export default Home;
