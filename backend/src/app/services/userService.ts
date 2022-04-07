import { User } from "../entities/User";
import CustomError from "../errors/CustomError";
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

    async create(user: Omit<User,'id'>): Promise<User> {
        if (!! await User.findOne({where: {discordUserId: user.discordUserId}})) {
            throw new CustomError(8);
        } else {
            const newUser = await User.create(user);
            return newUser.save();
        }
    }

    async getById(args: {id: string, relations: string[]}): Promise<User> {
        return User.findOne(args.id, {relations: args.relations});
    }
}

export default new UserService();