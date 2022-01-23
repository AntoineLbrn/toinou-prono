import { Box, Button, Center, HStack, Spacer, StackDivider } from '@chakra-ui/react';
import React, { FC } from 'react';
import logo from '../../logo.png';
import HeaderLogo from './HeaderLogo';
import HeaderFlexOverlay from './HeaderFlexOverlay';
import HeaderSection from './HeaderSection';
import history from '../../utils/history';

const Header: FC = () => {
    return <HeaderFlexOverlay >
        <Box width="10%" marginY="auto" height="80%"><HeaderLogo/></Box>
        <HStack height="100%">
            <HeaderSection>mes pronos</HeaderSection>
            <HeaderSection>intégrer</HeaderSection>
            <HeaderSection>documentation</HeaderSection>
            <HeaderSection onClick={() => history.push('/admin')}>🔒 admin</HeaderSection>
        </HStack>
        <Spacer />
        <Button mr='30px' my='auto'>Se connecter</Button>
    </HeaderFlexOverlay>;
}

export default Header;
