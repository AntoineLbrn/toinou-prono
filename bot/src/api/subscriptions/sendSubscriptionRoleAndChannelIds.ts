import ServerTournamentSubscribtion from "../../models/ServerTournamentSubscription";
import put from "../put";

const sendSubscriptionRoleAndChannelIds = async (args: { id: string, bettorRoleId: string, bettorChannelId: string }): Promise<ServerTournamentSubscribtion> => {
    return put(`tournament-subscription/`, args).then((data) => data as ServerTournamentSubscribtion);
}

export default sendSubscriptionRoleAndChannelIds;
