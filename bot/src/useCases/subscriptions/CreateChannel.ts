import { CommandInteraction, NonThreadGuildBasedChannel, Role } from "discord.js";
import ServerTournamentSubscribtion from "../../models/ServerTournamentSubscription";

class CreateChannel {
    public async execute (args: {subscription: ServerTournamentSubscribtion, interaction: CommandInteraction, role: Role}): Promise<NonThreadGuildBasedChannel> {
        if (args.interaction.guild) {
            return args.interaction.guild?.channels.create(args.subscription.bettorChannelLabel, {
                permissionOverwrites: [
                    {
                        deny: ["VIEW_CHANNEL", "SEND_MESSAGES"], id: args.interaction.guild.roles.everyone,
                    }, 
                    {
                        allow: "VIEW_CHANNEL", id : args.role.id
                    }
                ]
            });
        } else {
            throw new Error('Unexpected error');
        }
    }
}


export default new CreateChannel();