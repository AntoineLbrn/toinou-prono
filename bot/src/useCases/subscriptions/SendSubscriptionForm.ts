import { ActionRowBuilder, CommandInteraction } from "discord.js";
import RoleSelect from "../../components/selects/RoleSelect";
import ChannelSelect from "../../components/selects/ChannelSelect";
import ServerTournamentSubscribtion from "../../models/ServerTournamentSubscription";

class SendSubscriptionForm {
    public async execute (args: {subscription: ServerTournamentSubscribtion, interaction: CommandInteraction}): Promise<void> {
        if (args.interaction.guild) {
            const channelSelect = new ActionRowBuilder<ChannelSelect>().addComponents(new ChannelSelect(args.interaction.guild.channels, args.subscription));
            const roleSelect = new ActionRowBuilder<RoleSelect>().addComponents(new RoleSelect(args.interaction.guild.roles, args.subscription));
            args.interaction.editReply({ content: 'Sélectionne un rôle puis un channel'});    
            args.interaction.channel?.send({components: [channelSelect]});
            args.interaction.channel?.send({ components: [roleSelect]});
        }
    }
}

export default new SendSubscriptionForm();