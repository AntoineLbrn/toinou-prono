import { Box, Flex, Heading, HStack, Icon, Slide, SlideFade, Spacer, useBoolean, VStack } from "@chakra-ui/react";
import { FC } from "react";
import HeaderLogo from "./HeaderLogo";
import { MdMenu, MdClose } from "react-icons/md";
import headerTabs from '../../utils/headerTabs';
import HeaderMobileOptions from "./HeaderMobileOptions";

interface HeaderMobileProps {
    currentPathname: string
}

const HeaderMobile: FC<HeaderMobileProps> = ({currentPathname}) => {
    const [value, { toggle }] = useBoolean(false);
    const title = headerTabs.find((headerTab) => headerTab.url === currentPathname)?.label;

    return <>
        <Flex 
            bgColor="#1E2F3D" 
            boxShadow="0 0 .2rem #fff, 0 0 .2rem #fff, 0 0 2rem #20FCFF, 0 0 0rem #20FCFF, 0 0 2.8rem #20FCFF,inset 0 0 0rem #20FCFF;" 
            h="10vh"  
        >
            <Box h="90%" my="auto"><HeaderLogo /></Box>
            <Spacer />
            <Box my="auto">
                <Heading sx={{ fontVariant: 'small-caps' }} size='lg'>{title}</Heading>
            </Box>
            <Spacer />
            <VStack my="auto" onClick={toggle} spacing="1px">
                <Icon boxSize="12" as={value ? MdClose : MdMenu} />
                <Heading  size="sm">Menu</Heading>
            </VStack>
            <Box w="5%" />
        </Flex> 
        <SlideFade in={value}>
            <HeaderMobileOptions isActive={value} headerTabs={headerTabs} />
        </SlideFade>
        </>
}

export default HeaderMobile;
