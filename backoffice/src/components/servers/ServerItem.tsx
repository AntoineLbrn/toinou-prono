import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Avatar, Box, Button, Flex, Heading, HStack, Spacer, useDisclosure } from "@chakra-ui/react";
import { FC } from "react";
import addServer from "../../api/servers/addServer";
import DiscordServerAggregated from "../../models/DiscordServerAggregated";
import { canInviteBot } from "../../utils/permissions";
import ServerAsAvatar from "./ServerAsAvatar";
import { CheckCircleIcon } from '@chakra-ui/icons'
import ServerItemDetail from "./ServerItemDetail";

interface ServerItemProps {
    server: DiscordServerAggregated
}

const ServerItem: FC<ServerItemProps> = ({server}: ServerItemProps) => {

    return <AccordionItem borderColor="gray.200" py="10px">
        <AccordionButton>
            <Flex color="#ECE6D6" alignItems="center" w="100%">
                <ServerAsAvatar server={server.discordServer}/>
                <Heading ml="20px" fontSize="lg">{server.discordServer.name}</Heading>
                {server.server && <CheckCircleIcon ml="20px" fontSize="2xl" color="green.200"/>}
                <Spacer />
                <AccordionIcon h="100%"/>
            </Flex>
            </AccordionButton>
        <AccordionPanel color="white" pb={4}>
                <ServerItemDetail server={server}/>
        </AccordionPanel>
    </AccordionItem>
}

export default ServerItem;
