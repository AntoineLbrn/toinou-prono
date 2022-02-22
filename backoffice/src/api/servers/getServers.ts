import DiscordServerAggregated from "../../models/DiscordServerAggregated";
import get from "../get";

const getServers = async (): Promise<DiscordServerAggregated[]> => {
    return get(`discord/servers`).then((data) => data as DiscordServerAggregated[]);
}

export default getServers;
