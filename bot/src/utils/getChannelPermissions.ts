import { OverwriteResolvable, Collection, Role, Guild } from "discord.js";

const getChannelPermissions = (args: {guild: Guild, role: Role}): OverwriteResolvable[] | Collection<string, OverwriteResolvable> => {
    return [
        {
            deny: ["VIEW_CHANNEL", "SEND_MESSAGES"], id: args.guild.roles.everyone,
        }, 
        {
            allow: "VIEW_CHANNEL", id : args.role.id
        }
    ]
}

export default getChannelPermissions;