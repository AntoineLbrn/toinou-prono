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
        subscription.autoPostBetsHour = autoPostBetsHour !== undefined ? autoPostBetsHour : subscription.autoPostBetsHour;
        subscription.autoPostBetsMinutes = autoPostBetsMinutes !== undefined ? autoPostBetsMinutes : subscription.autoPostBetsMinutes;
        subscription.bettorRoleId = bettorRoleId !== undefined ? bettorRoleId : subscription.bettorRoleId;
        subscription.bettorRoleLabel = bettorRoleLabel !== undefined ? bettorRoleLabel : subscription.bettorRoleLabel;
        subscription.bettorChannelId = bettorChannelId !== undefined ? bettorChannelId : subscription.bettorChannelId;
        subscription.bettorChannelLabel = bettorChannelLabel !== undefined ? bettorChannelLabel : subscription.bettorChannelLabel;

        return subscription.save();
    }

    async get(id: string): Promise<ServerTournamentSubscribtion> {
        const subscription = await ServerTournamentSubscribtion.findOne({
            where: { id }, relations: ['server', 'tournament']
        });
        if (!subscription)
            throw new Error('No subscription for the given ID');
        return subscription;
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