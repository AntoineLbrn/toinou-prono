import { CommandInteraction } from "discord.js";
import { Discord, Guard, Slash, SlashOption } from "discordx";
import isAdmin from "../../decorators/isAdmin";
import getSubscriptionByTournamentLabelAndServerId from "../../api/subscriptions/getSubscriptionByTournamentLabelAndServerId";
import SendParticipationButton from "../../useCases/participations/SendParticipationButton";

@Discord()
abstract class OpenParticipation {

  @Slash("open-participation", {description: "Permet aux membres du serveur de s'inscrire à une compétition"})
  @Guard(isAdmin)
  public openSubscription(@SlashOption("tournament", { description: "Nom du tournoi à configurer", required: true}) tournamentName: string, interaction: CommandInteraction): void {
    if (interaction.guildId) {
        getSubscriptionByTournamentLabelAndServerId(tournamentName, interaction.guildId).then((subscription) => {
            if (subscription) {
                SendParticipationButton.execute({interaction, tournament: subscription.tournament});
            } else {
                interaction.reply(`Ce serveur ne participe pas à ${tournamentName}.`)
            }
        }).catch((err) => {
            interaction.reply(err.message)
        });
    } else {
        interaction.reply('Unexpected error');
    }
  }
}

export default OpenParticipation;