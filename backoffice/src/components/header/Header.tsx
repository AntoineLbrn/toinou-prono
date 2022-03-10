import { Box, HStack, Spacer } from '@chakra-ui/react';
import React, { FC } from 'react';
import HeaderLogo from './HeaderLogo';
import HeaderFlexOverlay from './HeaderFlexOverlay';
import HeaderSection from './HeaderSection';
import history from '../../utils/history';
import HeaderUserSection from './HeaderUserSection';

const Header: FC = () => {

    return <HeaderFlexOverlay>
        <Box width="10%" marginY="auto" height="80%"><HeaderLogo/></Box>
        <HStack height="100%">
            <HeaderSection onClick={() => history.push('/my-bets')}>mes pronos</HeaderSection>
            <HeaderSection onClick={() => history.push('/servers')}>mes serveurs</HeaderSection>
            <HeaderSection onClick={() => history.push('/tournaments')}>tournois</HeaderSection>
            <HeaderSection onClick={() => history.push('/admin')}>🔒 admin</HeaderSection>
        </HStack>
        <Spacer />
        <Box my="auto" mr='30px'>
            <HeaderUserSection />
        </Box>
    </HeaderFlexOverlay>;
}

export default Header;
