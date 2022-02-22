import DiscordServerAggregated from "../models/DiscordServerAggregated";

const sortServersByPermissions = (servers: DiscordServerAggregated[]) => {
    return servers.sort((server) => (BigInt(server.discordServer.permissions) & BigInt(0x20)) === BigInt(0x20) ? -1 : 1);
}

export default sortServersByPermissions;
