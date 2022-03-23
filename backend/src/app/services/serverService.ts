import { Server } from "../entities/Server";
import DiscordServer from "../models/DiscordServer";
import DiscordServerAggregated from "../models/DiscordServerAggregated";

class ServerService {
    
    async createServerFromDiscordServer(discordServer: DiscordServer): Promise<Server>{
    try {
        await Server.insert({
            discordServerId: discordServer.id,
            discordServerNameUsedToBe: discordServer.name
        });
    } catch (e) {
        throw 'Server already exists';
    }
    return this.getServerByDiscordServerId(discordServer.id);
    }

    async getServerByDiscordServerId(discordServerId: string): Promise<Server> {
        const server = await Server.findOne({
            where: { discordServerId },
        });
        if (!server)
            throw new Error('No server found for this discord server ID')
        return server;
    }

    async getServerDetail(id: string): Promise<Server> {
        const server = await Server.findOne({
            where: { id }, relations: ['subscribedTournaments', 'subscribedTournaments.tournament']
          });
        server.subscribedTournaments = server.subscribedTournaments.sort((a,b) => a.id.localeCompare(b.id));
        return server;
    }

    async getAllServers(): Promise<Server[]> {
        const servers = await Server.find({
            relations: ['subscribedTournaments', 'subscribedTournaments.tournament']
          });
        return servers;
    }

    async getAggregatedServersByDiscordServer(discordServers: DiscordServer[]): Promise<DiscordServerAggregated[]> {
        return Promise.all(discordServers.map(async (discordServer: DiscordServer) => await this.getAggregatedServerServerByDiscordServer(discordServer)));
    }

    async getAggregatedServerServerByDiscordServer(discordServer: DiscordServer): Promise<DiscordServerAggregated> {
        try {
            const server = await this.getServerByDiscordServerId(discordServer.id);
            return { discordServer: discordServer, server};
        } catch {
            return { discordServer: discordServer, server: undefined };
        }
    }
}

export default new ServerService();