import DiscordServerAggregated from "../../models/DiscordServerAggregated";
import get from "../get";

const getServer = async (serverId: string): Promise<DiscordServerAggregated> => {
    return get(`server/${serverId}`).then((data) => data as DiscordServerAggregated);
}

export default getServer;
