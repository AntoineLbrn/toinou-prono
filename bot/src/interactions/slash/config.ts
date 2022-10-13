import { ApplicationCommandOptionType, CommandInteraction    } from "discord.js";
import { Discord, Guard, Slash, SlashOption } from "discordx";
import hasSubscriptionLabelsBeenDefined from "../../utils/hasSubscriptionLabelsBeenDefined";
import getSubscriptionByTournamentLabelAndServerId from "../../api/subscriptions/getSubscriptionByTournamentLabelAndServerId";
import isAdmin from "../../decorators/isAdmin";
import isSubscriptionConfigured from "../../utils/isSubscriptionConfigured";
import CreateRoleAndChannel from "../../useCases/subscriptions/CreateRoleAndChannel";
import SendSubscriptionForm from "../../useCases/subscriptions/SendSubscriptionForm";
import sendSubscriptionRoleAndChannel from "../../api/subscriptions/sendSubscriptionRoleAndChannel";
import { autocompleteTournaments } from "../../utils/autocompleteTournaments";

@Discord()
abstract class Config {

  @Slash({name:"config", description: 'Configure une compétition pour ton serveur'})
  @Guard(isAdmin)
  public configurate(@SlashOption({name:"tournament", description: "Nom du tournoi à configurer", autocomplete: autocompleteTournaments, type: ApplicationCommandOptionType.String, required: true}) tournamentName: string, interaction: CommandInteraction): void {
    if (interaction.guildId) {
        getSubscriptionByTournamentLabelAndServerId(tournamentName, interaction.guildId).then((subscription) => {
            if (subscription) {
                if (hasSubscriptionLabelsBeenDefined(subscription)) {
                    if (isSubscriptionConfigured(subscription)) {
                        const channel = interaction.guild?.channels.cache.find((channel) => channel.id === subscription.bettorChannelId)?.toString();
                        const role = interaction.guild?.roles.cache.find((role) => role.id === subscription.bettorRoleId)?.name;
                        interaction.editReply(`Compétition déjà configurée (role : ${role}) (channel : ${channel})`);
                    } else {
                        CreateRoleAndChannel.execute({interaction, subscription}).then(({role, channel}) => {
                            sendSubscriptionRoleAndChannel({id: subscription.id, bettorRoleId: role.id, bettorChannelId: channel.id})
                        });
                    }
                } else {
                    SendSubscriptionForm.execute({interaction, subscription});
                }
            } else {
                interaction.editReply(`Ce serveur ne participe pas à ${tournamentName}.`)
            }
        }).catch((err) => {
            interaction.editReply(err.message)
        });
    } else {
        interaction.editReply('Unexpected error');
    }
}


}

// JOIN-TOURNAMENT INTERACTION
// SEE ALL TOURNAMENTS INTERACTION
export default Config;