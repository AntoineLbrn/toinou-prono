import { Avatar } from "@chakra-ui/react";
import { FC } from "react";
import DiscordServer from "../../models/DiscordServer";

interface ServerAsAvatarProps {
    server: DiscordServer
}

const ServerAsAvatar: FC<ServerAsAvatarProps> = ({server}: ServerAsAvatarProps) => {
    return <Avatar size="lg" src={`https://cdn.discordapp.com/icons/${server.id}/${server.icon}`} />; 
}

export default ServerAsAvatar;
