import { Box, Flex, Heading, Image, Link, Spacer } from '@chakra-ui/react';
import React, { FC } from 'react';
import Header from '../components/header/Header';
import Home from '../components/home/Home';

const HomePage: FC = () => {
    return <><Header />
        <Home />
    </>;
}

export default HomePage;
