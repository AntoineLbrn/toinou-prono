import ServerTournamentSubscribtion from "../../models/ServerTournamentSubscription";
import get from "../get";

const getSubscriptionsByServerId = async (serverId: string, relations: string[] = []): Promise<ServerTournamentSubscribtion[]> => {
    return get(`tournaments/${serverId}?relations=${relations.join(',')}`).then((data) => data as ServerTournamentSubscribtion[]);
}

export default getSubscriptionsByServerId;
