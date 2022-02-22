import DiscordServer from "../../models/DiscordServer";
import get from "../get";

const getDiscordServerDetail = async (serverId: string): Promise<DiscordServer> => {
    return get(`discord/server/${serverId}`).then((data) => data as DiscordServer);
}

export default getDiscordServerDetail;
