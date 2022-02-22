import { Server } from "../entities/Server";
import DiscordServer from "./DiscordServer";

interface DiscordServerAggregated {
    discordServer: DiscordServer
    server: Server
}

export default DiscordServerAggregated;
