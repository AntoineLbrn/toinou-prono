import { Server } from "../../entities/Server";
import DiscordServer from "../../models/DiscordServer";

interface ServerCreated {
    discordServer: DiscordServer,
    server: Server
}

export default ServerCreated