import ServerTournamentSubscribtion from "../../models/ServerTournamentSubscription";
import get from "../get";

const getSubscriptionByTournamentLabelAndServerId = async (tournamentId: string, serverId: string): Promise<ServerTournamentSubscribtion> => {
    return get(`subscription/tournamentId=${tournamentId}&serverId=${serverId}`).then((data) => data as ServerTournamentSubscribtion);
}

export default getSubscriptionByTournamentLabelAndServerId;
