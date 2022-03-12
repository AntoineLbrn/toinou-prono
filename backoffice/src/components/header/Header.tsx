import { Box, HStack, Spacer } from '@chakra-ui/react';
import { FC } from 'react';
import HeaderLogo from './HeaderLogo';
import HeaderFlexOverlay from './HeaderFlexOverlay';
import HeaderSection from './HeaderSection';
import history from '../../utils/history';
import HeaderUserSection from './HeaderUserSection';
import useIsMobile from '../../hooks/useIsMobile';
import HeaderMobile from './HeaderMobile';
import headerTabs from '../../utils/headerTabs';

const Header: FC = () => {
    const isMobile = useIsMobile();
    history.location.pathname

    return isMobile ? <HeaderMobile currentPathname={history.location.pathname} /> : <HeaderFlexOverlay>
        <Box width="10%" marginY="auto" height="80%"><HeaderLogo/></Box>
        <HStack height="100%">
            {headerTabs.map((headerTab) => (
                <HeaderSection isActive={history.location.pathname === headerTab.url} onClick={() => history.push(headerTab.url)}>{headerTab.label}</HeaderSection>
            ))}
        </HStack>
        <Spacer />
        <Box my="auto" mr='30px'>
            <HeaderUserSection />
        </Box>
    </HeaderFlexOverlay>;
}

export default Header;
