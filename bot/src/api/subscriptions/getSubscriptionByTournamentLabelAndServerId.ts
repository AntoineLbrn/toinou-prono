import ServerTournamentSubscribtion from "../../models/ServerTournamentSubscription";
import get from "../get";

const getSubscriptionByTournamentLabelAndServerId = async (label: string, serverId: string): Promise<ServerTournamentSubscribtion> => {
    return get(`subscription/tournamentLabel=${label}&serverId=${serverId}`).then((data) => data as ServerTournamentSubscribtion);
}

export default getSubscriptionByTournamentLabelAndServerId;
