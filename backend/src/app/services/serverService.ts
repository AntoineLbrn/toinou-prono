import { Server } from "../entities/Server";
import DiscordServer from "../models/DiscordServer";
import DiscordServerAggregated from "../models/DiscordServerAggregated";

class ServerService {
    
    async createServerFromDiscordServer(discordServer: DiscordServer): Promise<Server>{
    try {
        await Server.insert({
            discordServerId: discordServer.id
        });
    } catch (e) {
        throw 'Server already exists';
    }
    return this.getServerByDiscordServerId(discordServer.id);
    }

    async getServerByDiscordServerId(discordServerId: string): Promise<Server> {
        return await Server.findOne({
            where: { discordServerId },
          });
    }

    async getServerDetail(id: string): Promise<Server> {
        const server = await Server.findOne({
            where: { id }, relations: ['subscribedTournaments', 'subscribedTournaments.tournament']
          });
        server.subscribedTournaments = server.subscribedTournaments.sort((a,b) => a.id.localeCompare(b.id));
        return server;
    }

    async getAggregatedServersByDiscordServer(discordServers: DiscordServer[]): Promise<DiscordServerAggregated[]> {
        return Promise.all(discordServers.map(async (discordServer: DiscordServer) => await this.getAggregatedServerServerByDiscordServer(discordServer)));
    }

    async getAggregatedServerServerByDiscordServer(discordServer: DiscordServer): Promise<DiscordServerAggregated> {
        console.log({ discordServer: discordServer, server: await this.getServerByDiscordServerId(discordServer.id) })
        return { discordServer: discordServer, server: await this.getServerByDiscordServerId(discordServer.id) };
    }
}

export default new ServerService();