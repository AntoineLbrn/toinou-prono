import { realpathSync } from 'fs';
import fetch from 'node-fetch';
import DiscordServer from '../models/DiscordServer';
import DiscordTokenResponse from '../models/DiscordTokenResponse';
import DiscordUser from '../models/DiscordUser';

class DiscordService {
    async getDiscordAccessToken(code: string, state: string): Promise<DiscordTokenResponse> {
        const rawResponse = await fetch(`${process.env.DISCORD_API_URL}/oauth2/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `code=${code}&state=${state}&client_id=${process.env.DISCORD_CLIENT_ID}&client_secret=${process.env.DISCORD_CLIENT_PWD}&grant_type=authorization_code&redirect_uri=${process.env.FRONTEND_URL}`,
        });
        if (!rawResponse.ok) throw await rawResponse.json();
        return rawResponse.json();
    }

    async getDiscordUserByToken(token: string): Promise<DiscordUser> {
        return this.baseRequest('users/@me', 'GET', token) as Promise<DiscordUser>;
    }
    
    async getDiscordServersByToken(token: string): Promise<DiscordServer[]> {
        return this.baseRequest('users/@me/guilds', 'GET', token);
    }

    async getDiscordServerDetail(serverId: string, token: string): Promise<DiscordServer> {
        return this.baseRequest('users/@me/guilds', 'GET', token).then((discordServers: DiscordServer[]) => {
            return discordServers.find((discordServer) => discordServer.id === serverId);
        });
    }

    private async baseRequest(url: string, method: any, token: string, body?: string) {
        const a = await this.fetchRetry(
            `${process.env.DISCORD_API_URL}/${url}`, 
            {
                method,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Bearer ${token}`, 
                },
                body,
            },
            3);

        return a;
        }

    private async fetchRetry(url: string, options: any, retries: number): Promise<any> {
        return await fetch(url, options).then(async res => {
            if (res.ok) {
                return res.json()
            }
            if (retries > 0 && res.status === 429) {
                await delay(1000);
                return this.fetchRetry(url, options, retries - 1)
            } else {
                throw new Error(res.statusText)
            } 

        }).catch(console.error)

    }
}

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export default new DiscordService();