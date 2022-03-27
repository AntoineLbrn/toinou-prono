import { CommandInteraction, MessageActionRow } from "discord.js";
import RoleSelect from "../../components/selects/RoleSelect";
import ChannelSelect from "../../components/selects/ChannelSelect";
import ServerTournamentSubscribtion from "../../models/ServerTournamentSubscription";

class SendSubscriptionForm {
    public async execute (args: {subscription: ServerTournamentSubscribtion, interaction: CommandInteraction}): Promise<void> {
        if (args.interaction.guild) {
            const channelSelect = new MessageActionRow().addComponents(new ChannelSelect(args.interaction.guild.channels, args.subscription));
            const roleSelect = new MessageActionRow().addComponents(new RoleSelect(args.interaction.guild.roles, args.subscription));

            args.interaction.reply({ content: 'Sélectionne un rôle puis un channel'});    
            args.interaction.channel?.send({components: [roleSelect]});
            args.interaction.channel?.send({components: [channelSelect]});
        }
    }
}

export default new SendSubscriptionForm();