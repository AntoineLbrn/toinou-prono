import { User } from "../entities/User";
import DiscordUser from "../models/DiscordUser";

class UserService {
    async createUserIfNotExists(discordUser: DiscordUser): Promise<User> {
        let user = await this.getUserByDiscordUserId(discordUser.id);
        if (!user) {
            await User.insert({
                discordUserId: discordUser.id, 
                isSuperAdmin: false, 
                tagUsedToBe: `${discordUser.username}${discordUser.discriminator}`
            });
            user = await this.getUserByDiscordUserId(discordUser.id);
        }
    
        return user;
    }

    async getUserByDiscordUserId(discordUserId: string): Promise<User> {
        return await User.findOne({
            where: { discordUserId },
          });
    }
}

export default new UserService();