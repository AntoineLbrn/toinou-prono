import fetch from 'node-fetch';
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

    private async baseRequest(url: string, method: any, token: string, body?: string) {
        const rawResponse = await fetch(`${process.env.DISCORD_API_URL}/${url}`, {
            method,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${token}`, 
            },
            body
            });
        if (!rawResponse.ok) throw await rawResponse.json();
        return rawResponse.json();
    }    
}

export default new DiscordService();