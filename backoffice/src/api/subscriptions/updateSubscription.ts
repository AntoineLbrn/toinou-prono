import Server from "../../models/Server";
import ServerTournamentSubscribtion from "../../models/ServerTournamentSubscription";
import Tournament from "../../models/Tournament";
import put from "../put";

interface updateSubscriptionDTO {
    id: string
    server?: Server
    tournament?: Tournament
    shouldAutoPostBets?: boolean
    autoPostBetsHour?: string
    autoPostBetsMinutes?: string
    bettorRoleId?: string
    bettorRoleLabel?: string
    bettorChannelId?: string
    bettorChannelLabel?: string
}

const updateSubscription = async (serverTournamentSubscription: updateSubscriptionDTO): Promise<ServerTournamentSubscribtion> => {
    return put('tournament-subscription/edit', serverTournamentSubscription);
}

export default updateSubscription;
