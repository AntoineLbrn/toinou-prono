import { ApplicationCommandOptionType, CommandInteraction } from "discord.js";
import { Discord, Guard, Slash, SlashOption } from "discordx";
import isAdmin from "../../decorators/isAdmin";
import getSubscriptionByTournamentLabelAndServerId from "../../api/subscriptions/getSubscriptionByTournamentLabelAndServerId";
import SendParticipationButton from "../../useCases/participations/SendParticipationButton";
import { autocompleteTournaments } from "../../utils/autocompleteTournaments";

@Discord()
abstract class OpenParticipation {

  @Slash({name: "open-participation", description: "Permet aux membres du serveur de s'inscrire à une compétition"})
  @Guard(isAdmin)
  public openSubscription(@SlashOption({name: "tournament", description: "Nom du tournoi à configurer", autocomplete: autocompleteTournaments, type: ApplicationCommandOptionType.String, required: true}) tournamentName: string, interaction: CommandInteraction): void {
    if (interaction.guildId) {
        getSubscriptionByTournamentLabelAndServerId(tournamentName, interaction.guildId).then((subscription) => {
            if (subscription) {
                SendParticipationButton.execute({interaction, tournament: subscription.tournament});
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

export default OpenParticipation;