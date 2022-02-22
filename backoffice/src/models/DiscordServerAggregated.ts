import DiscordServer from "./DiscordServer";
import Server from "./Server";

interface DiscordServerAggregated {
    discordServer: DiscordServer
    server: Server
}

export default DiscordServerAggregated;
