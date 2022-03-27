import ServerTournamentSubscribtion from "../../models/ServerTournamentSubscription";
import put from "../put";

const sendSubscriptionRoleAndChannel = async (args: { id: string, bettorRoleId?: string, bettorChannelId?: string, bettorRoleLabel?: string, bettorChannelLabel?: string }): Promise<ServerTournamentSubscribtion> => {
    return put(`tournament-subscription/`, args).then((data) => data as ServerTournamentSubscribtion);
}

export default sendSubscriptionRoleAndChannel;
