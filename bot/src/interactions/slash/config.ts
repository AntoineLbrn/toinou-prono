import { CommandInteraction, MessageActionRow, MessageSelectMenu } from "discord.js";
import { Discord, Guard, Slash, SlashOption } from "discordx";
import hasSubscriptionLabelsBeenDefined from "../../utils/hasSubscriptionLabelsBeenDefined";
import getSubscriptionByTournamentLabelAndServerId from "../../api/subscriptions/getSubscriptionByTournamentLabelAndServerId";
import isAdmin from "../../decorators/isAdmin";
import isSubscriptionConfigured from "../../utils/isSubscriptionConfigured";
import CreateRoleAndChannel from "../../useCases/subscriptions/CreateRoleAndChannel";
import SendSubscriptionForm from "../../useCases/subscriptions/SendSubscriptionForm";
import sendSubscriptionRoleAndChannel from "../../api/subscriptions/sendSubscriptionRoleAndChannel";

@Discord()
abstract class Config {

  @Slash("config", {description: 'Configure une compétition pour ton serveur'})
  @Guard(isAdmin)
  public configurate(@SlashOption("tournament", { description: "Nom du tournoi à configurer", required: true}) tournamentName: string, interaction: CommandInteraction): void {
    if (interaction.guildId) {
        getSubscriptionByTournamentLabelAndServerId(tournamentName, interaction.guildId).then((subscription) => {
            if (hasSubscriptionLabelsBeenDefined(subscription)) {
                if (isSubscriptionConfigured(subscription)) {
                    const channel = interaction.guild?.channels.cache.find((channel) => channel.id === subscription.bettorChannelId)?.toString();
                    const role = interaction.guild?.roles.cache.find((role) => role.id === subscription.bettorRoleId)?.name;
                    interaction.reply(`Compétition déjà configurée (role : ${role}) (channel : ${channel})`);
                } else {
                    CreateRoleAndChannel.execute({interaction, subscription}).then(({role, channel}) => {
                        sendSubscriptionRoleAndChannel({id: subscription.id, bettorRoleId: role.id, bettorChannelId: channel.id})
                    });
                }
            } else {
                SendSubscriptionForm.execute({interaction, subscription});
            }
        }).catch((err) => {
            interaction.reply(err.message)
        });
    } else {
        interaction.reply('Unexpected error');
    }
}


}

// JOIN-TOURNAMENT INTERACTION
// SEE ALL TOURNAMENTS INTERACTION
export default Config;