import ServerTournamentSubscribtion from "../../models/ServerTournamentSubscription";
import put from "../put";

const setupTournamentSubscription = async (role: string, channel: string, serverSubscriptionId: string): Promise<ServerTournamentSubscribtion> => {
    return put('tournament-subscription/edit', {bettorRoleLabel: role, bettorChannelLabel: channel, id: serverSubscriptionId});
}

export default setupTournamentSubscription;
