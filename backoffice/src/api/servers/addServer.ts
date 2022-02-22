import DiscordServer from "../../models/DiscordServer";
import post from "../post";

const addServer = async (server: DiscordServer): Promise<DiscordServer> => {
    return post(`server/add`, server).then((data) => data as DiscordServer);
}

export default addServer;
