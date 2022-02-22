import { CheckCircleIcon } from '@chakra-ui/icons';
import { StackDivider, Box, Spacer, Container, HStack, Heading, Flex, VStack, Button, useDisclosure, Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Icon } from '@chakra-ui/react';
import React, { FC } from 'react';
import { MdHouse } from 'react-icons/md';
import { useQuery } from 'react-query';
import getServers from '../../api/servers/getServers';
import DiscordServerAggregated from '../../models/DiscordServerAggregated';
import sortServersByPermissions from '../../utils/sortServersByPermissions';
import ServerAsAvatar from './ServerAsAvatar';
import ServerItem from './ServerItem';

const ServerList: FC = () => {
    const { data } = useQuery('getServers', getServers);
    const sortedServers = data ? sortServersByPermissions(data) : null;

    return <Box>
            <Container mt="50px" maxW="container.lg" boxShadow="0 0 .2rem #fff, 0 0 .2rem #fff" bgColor="#1E2F3D">
                <Container py="30px" maxW="container.lg"> 
                    <Heading pb="20px" fontSize="3xl" color="#ECE6D6" sx={{ fontVariant: 'small-caps' }}>liste de tes serveurs </Heading>
                    <Heading pb="50px" fontWeight="500" fontSize="lg" color="#ECE6D6">Tu ne peux inviter ToinouProno sur ton serveur que si tu possèdes les droits d'amninistrateur. </Heading>
                    <VStack spacing="20px">
                        <Accordion allowToggle={true} w="100%">
                            {sortedServers?.map((server: DiscordServerAggregated) =>
                                <ServerItem key={server.discordServer.id} server={server} />
                            )}
                        </Accordion>
                    </VStack>
                </Container>
            </Container>
        </Box>
}

export default ServerList;
