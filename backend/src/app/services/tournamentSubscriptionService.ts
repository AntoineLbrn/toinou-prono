import { Server } from "../entities/Server";
import { ServerTournamentSubscribtion } from "../entities/ServerTournamentSubscribtion";
import { Tournament } from "../entities/Tournament";
import CustomError from "../errors/CustomError";
import serverService from "./serverService";
import tournamentService from "./tournamentService";

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

    async getByDiscordServerId(args: {discordServerId: string, relations: string[]}): Promise<ServerTournamentSubscribtion[]> {
        const server = await serverService.getServerByDiscordServerId(args.discordServerId);
        return ServerTournamentSubscribtion.find({where: { server }, relations: args.relations.length ? args.relations : ['tournament', 'tournament.matches', 'tournament.matches.bets'] });
    }

    async getByLabelAndServerId(label: string, serverId: string): Promise<ServerTournamentSubscribtion> {
        const tournament = await tournamentService.getByLabel(label);
        if (!tournament)
            throw new CustomError(3);
        const server = await Server.findOne({discordServerId: serverId});
        if (!server)
            throw new CustomError(4);
        return ServerTournamentSubscribtion.findOne({tournament, server}, {relations: ['tournament']});
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

    async getByTournamentIdAndServerId(tournamentId: string, serverId: string): Promise<ServerTournamentSubscribtion> {
        const tournament = await Tournament.findOne({id: tournamentId});
        if (!tournament)
            throw new CustomError(3);
        const server = await Server.findOne({discordServerId: serverId});
        if (!server)
            throw new CustomError(4);
        return ServerTournamentSubscribtion.findOne({tournament, server}, {relations: ['tournament']});
    }

    async getAll(): Promise<ServerTournamentSubscribtion[]> {
        return ServerTournamentSubscribtion.find({relations: ['tournament', 'tournament.matches', 'tournament.matches.bets']});
    }
}

export default new tournamentSubscriptionService();