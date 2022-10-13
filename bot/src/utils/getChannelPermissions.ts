import { OverwriteResolvable, Collection, Role, Guild,PermissionsBitField} from "discord.js";

const getChannelPermissions = (args: {guild: Guild, role: Role}): OverwriteResolvable[] | Collection<string, OverwriteResolvable> => {
    return [
        {
            deny: [ PermissionsBitField.Flags.ViewChannel ,  PermissionsBitField.Flags.SendMessages ], id: args.guild.roles.everyone,
        }, 
        {
            allow:  PermissionsBitField.Flags.ViewChannel , id : args.role.id
        }
    ]
}

export default getChannelPermissions;