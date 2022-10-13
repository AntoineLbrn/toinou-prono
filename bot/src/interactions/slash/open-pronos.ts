import { ApplicationCommandOptionType, CommandInteraction } from "discord.js";
import { Discord, Guard, Slash, SlashOption } from "discordx";
import ServerTournamentSubscribtion from "../../models/ServerTournamentSubscription";
import getSubscriptionsByServerId from "../../api/subscriptions/getSubscriptionsByServerId";
import isAdminOrDM from "../../decorators/isAdminOrDM";
import SendTournamentsButtons from "../../useCases/tournaments/SendTournamentsButtons";
import { UserTournamentParticipation } from "../../models/UserTournamentParticipation";
import getParticipationsByUserId from "../../api/participations/getParticipationsByUserId";
import SendTournamentIncomingMatches from "../../useCases/matches/SendTournamentIncomingMatches";
import getTournamentByName from "../../api/tournaments/getTournamentByName";

@Discord()
abstract class OpenPronos {

  @Slash({name: "open-pronos", description: 'Affiche les prochains pronostics'})
  @Guard(isAdminOrDM)
  public openPronos(
    @SlashOption({name: "n", description: "nombre de prochains jours à consulter", required: false, type: ApplicationCommandOptionType.Number}) days: number,
    @SlashOption({name: "tournament", description: "Nom du tournoi à consulter", required: false, type: ApplicationCommandOptionType.String}) tournamentName: string,
    interaction: CommandInteraction
  ): void {
    if (interaction.guildId) {
      this.openServerPronos(interaction, days ? days : 1, tournamentName);  
    } else {
      this.openDMPronos(interaction, days ? days : 1, tournamentName);
    }
  }

  private openDMPronos = (interaction: CommandInteraction, days: number, tournamentName: string) => {
    if (tournamentName) {
      getTournamentByName(tournamentName).then((tournament) => {
        interaction.editReply(`Voici les matchs de ${tournamentName}`)
        SendTournamentIncomingMatches.execute({tournament, channel: interaction.user, days})
      }).catch((err) => {
        interaction.editReply(err.message)
      });  
    } else {
      getParticipationsByUserId(interaction.user.id).then(async (participations: UserTournamentParticipation[]) => {
        if (tournamentName) {
          getTournamentByName(tournamentName).then((tournament) => {
            SendTournamentIncomingMatches.execute({tournament, channel: interaction.user, days})
          })
        }
        SendTournamentsButtons.execute({tournaments: participations.map((participation) => participation.tournament), channel: interaction.user, days});
  
        interaction.editReply({
          content: "Cliquez sur le tournoi à afficher",
        })
      }).catch((err) => {
        interaction.editReply(err.message)
      });  
    }
  }

  private openServerPronos = (interaction: CommandInteraction, days: number, tournamentName: string) => {

    if (tournamentName) {
      getTournamentByName(tournamentName).then((tournament) => {
        interaction.editReply(`Voici les matchs de ${tournamentName}`)
        SendTournamentIncomingMatches.execute({tournament, channel: interaction.channel, days})
      }).catch((err) => {
        interaction.editReply(err.message)
      });  
    } else if (interaction.guildId) {
      getSubscriptionsByServerId(interaction.guildId, ["tournament"]).then(async (subscriptions: ServerTournamentSubscribtion[]) => {
        SendTournamentsButtons.execute({tournaments: subscriptions.map((subscription) => subscription.tournament), channel: interaction.channel, days});
  
        interaction.editReply({
          content: "Cliquez sur le tournoi à afficher",
        })
  
      }).catch((err) => {
        interaction.editReply(err.message)
      });
    } else {
      interaction.editReply('Unexpected error')
    }
  }
}

export default OpenPronos;