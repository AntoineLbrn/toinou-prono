import ServerTournamentSubscribtion from "../../models/ServerTournamentSubscription";
import get from "../get";

const getSubscriptionsByServerId = async (serverId: string): Promise<ServerTournamentSubscribtion[]> => {
    return get(`tournaments/${serverId}`).then((data) => data as ServerTournamentSubscribtion[]);
}

export default getSubscriptionsByServerId;
