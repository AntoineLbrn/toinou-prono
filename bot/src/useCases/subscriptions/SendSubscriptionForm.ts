import { CommandInteraction, MessageActionRow, MessageSelectMenu } from "discord.js";
import RoleSelect from "../../components/selects/RoleSelect";
import ChannelSelect from "../../components/selects/ChannelSelect";
import ServerTournamentSubscribtion from "../../models/ServerTournamentSubscription";
import ConfigurationValidationButton from "../../components/buttons/ConfigurationValidationButton";

class SendSubscriptionForm {
    public async execute (args: {subscription: ServerTournamentSubscribtion, interaction: CommandInteraction}): Promise<void> {
        if (args.interaction.guild) {
            const row = new MessageActionRow()
                .addComponents(
                    new ChannelSelect(args.interaction.guild.channels),
                    new RoleSelect(args.interaction.guild.roles),
                    new ConfigurationValidationButton(args.subscription)
                );
            
            args.interaction.reply({ content: 'Sélectionne un channel et un rôle puis clicke sur terminer', components: [row] });    
        }
    }
}

export default new SendSubscriptionForm();