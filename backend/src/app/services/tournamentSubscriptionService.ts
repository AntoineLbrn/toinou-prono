import { Server } from "../entities/Server";
import { ServerTournamentSubscribtion } from "../entities/ServerTournamentSubscribtion";
import { Tournament } from "../entities/Tournament";

class tournamentSubscriptionService {
    
    async edit(id: string, shouldAutoPostBets: boolean, autoPostBetsHour: string, autoPostBetsMinutes: string, bettorRoleId: string, bettorRoleLabel: string, bettorChannelId: string, bettorChannelLabel: string): Promise<ServerTournamentSubscribtion> {
        const subscription = await ServerTournamentSubscribtion.findOne({
            where: { id },
        });
        if (!subscription)
            throw new Error('No subscription for the given ID');
        subscription.shouldAutoPostBets = shouldAutoPostBets !== undefined ? shouldAutoPostBets : subscription.shouldAutoPostBets;
        subscription.autoPostBetsHour = autoPostBetsHour ? autoPostBetsHour : subscription.autoPostBetsHour;
        subscription.autoPostBetsMinutes = autoPostBetsMinutes ? autoPostBetsMinutes : subscription.autoPostBetsMinutes;
        subscription.bettorRoleId = bettorRoleId ? bettorRoleId : subscription.bettorRoleId;
        subscription.bettorRoleLabel = bettorRoleLabel ? bettorRoleLabel : subscription.bettorRoleLabel;
        subscription.bettorChannelId = bettorChannelId ? bettorChannelId : subscription.bettorChannelId;
        subscription.bettorChannelLabel = bettorChannelLabel ? bettorChannelLabel : subscription.bettorChannelLabel;

        return subscription.save();
    }

    async insertNewTournamentSubscription(serverId: string, tournamentId: string): Promise<ServerTournamentSubscribtion> {
        const server = await Server.findOne(serverId);
        if (!server)
            throw new Error('This server does not exist');
        const tournament = await Tournament.findOne(tournamentId);
        if (!tournament)
            throw new Error('this tournament does not exist');
        const subscription = await ServerTournamentSubscribtion.create({server, tournament});
        subscription.save();
        return subscription;
    }
}

export default new tournamentSubscriptionService();