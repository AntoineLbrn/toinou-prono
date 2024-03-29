import { CommandInteraction, NonThreadGuildBasedChannel, Role } from "discord.js";
import getChannelPermissions from "../../utils/getChannelPermissions";
import ServerTournamentSubscribtion from "../../models/ServerTournamentSubscription";

class CreateChannel {
    public async execute (args: {subscription: ServerTournamentSubscribtion, interaction: CommandInteraction, role: Role}): Promise<NonThreadGuildBasedChannel> {
        if (args.interaction.guild) {
            return args.interaction.guild?.channels.create({name: args.subscription.bettorChannelLabel,
                permissionOverwrites: getChannelPermissions({guild: args.interaction.guild, role: args.role})
        });
        } else {
            throw new Error('Unexpected error');
        }
    }
}


export default new CreateChannel();