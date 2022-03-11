import { User } from "../entities/User";
import DiscordUser from "../models/DiscordUser";

class UserService {
    async createUserIfNotExists(discordUser: DiscordUser): Promise<User> {
        let user = await this.getUserByDiscordUserId(discordUser.id);
        console.log(user)
        if (!user) {
            await User.insert({
                discordUserId: discordUser.id, 
                isSuperAdmin: false, 
                tagUsedToBe: `${discordUser.username}${discordUser.discriminator}`
            });
            user = await this.getUserByDiscordUserId(discordUser.id);
        }
        console.log(user)
    
        return user;
    }

    async getUserByDiscordUserId(discordUserId: string): Promise<User> {
        return await User.findOne({
            where: { discordUserId },
          });
    }
}

export default new UserService();