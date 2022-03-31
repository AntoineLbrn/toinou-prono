import { Avatar, background, Link , Box, Button, Flex, Menu, MenuButton, MenuItem, MenuList, Select, Spacer, useDisclosure } from "@chakra-ui/react";
import { FC } from "react";
import addServer from "../../api/servers/addServer";
import DiscordServerAggregated from "../../models/DiscordServerAggregated";
import { canInviteBot } from "../../utils/permissions";
import history from '../../utils/history';
import { logout } from "../../utils/session";
import ServerPermissionModal from "./ServerPermissionModal";

interface ServerItemDetailProps {
    server: DiscordServerAggregated
}

const ServerItemDetail: FC<ServerItemDetailProps> = ({server}: ServerItemDetailProps) => {
    const {onOpen, isOpen, onClose} = useDisclosure();
    const invitable = canInviteBot(server.discordServer.permissions);
    const alreadyInvited = !!server.server;
    const onInvite = () => {
        window.open(
            `https://discord.com/oauth2/authorize?client_id=${process.env.REACT_APP_DISCORD_CLIENT_ID}&permissions=8&scope=applications.commands%20bot&guild_id=${server.discordServer.id}`, 
            '_blank'
        )?.focus();
        addServer(server.discordServer);
    }

    return <Flex pt="10px">
        {invitable && !alreadyInvited && <Button colorScheme="white" onClick={() => onInvite()}>Ajouter le bot</Button>}
        {!invitable && !alreadyInvited && 
            <Box>
                Tu n'as pas les 
                <Link fontWeight="bold" onClick={onOpen}> permissions </Link> 
                nécessaires pour consulter ce serveur
                <ServerPermissionModal onClose={onClose} isOpen={isOpen} permissions={server.discordServer.permissions} />
            </Box>
        }
        {alreadyInvited && <Box border="1px solid white" padding="10px" rounded="lg" _hover={{cursor: 'pointer', backgroundColor:"#283c4d"}} width="inherit" onClick={() => history.push(`server/${server.server.id}`)}>
            🏆 {server.server.subscribedTournaments?.length} compétitions
        </Box>}
        <Spacer />

        <Spacer />
        {invitable && alreadyInvited && <Menu>
            <MenuButton px="10px" rounded="lg" _hover={{backgroundColor: "#283c4d"}}>
                ⚙️ Configurer
            </MenuButton>
            <MenuList>
                <MenuItem onClick={() => history.push('server/tournaments')}>🏆 Voir les compétitions</MenuItem>
                <MenuItem onClick={() => history.push('server/tournaments/add')}>➕ Ajouter une compétition</MenuItem>
                 <MenuItem onClick={() => onInvite()}>✉️ Réinviter le bot</MenuItem>
            </MenuList>
        </Menu>}

    </Flex>; 
}

export default ServerItemDetail;
