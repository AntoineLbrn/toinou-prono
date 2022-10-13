import { CommandInteraction } from "discord.js";
import { Discord, Guild, Slash } from "discordx";
import getSubscriptionsByServerId from "../../api/subscriptions/getSubscriptionsByServerId";
import getParticipationsByUserId from "../../api/participations/getParticipationsByUserId";
import { UserTournamentParticipation } from "../../models/UserTournamentParticipation";
import ServerTournamentSubscribtion from "../../models/ServerTournamentSubscription";
import SendTournamentsEmbedMessage from "../../useCases/tournaments/SendTournamentsEmbedMessage";

@Discord()
abstract class TournamentList {
  @Slash({name: "tournament-list", description: "List of tournamenet recorded"})
  public tournamentList(interaction: CommandInteraction): void {
    if (interaction.guildId) {
        this.showServerTournaments(interaction);  
    } else {
        this.showDMTournaments(interaction);
    }
  }

  private showDMTournaments = (interaction: CommandInteraction) => {
    getParticipationsByUserId(interaction.user.id).then(async (participations: UserTournamentParticipation[]) => {
      SendTournamentsEmbedMessage.execute({tournaments: participations.map((participation) => participation.tournament), channel: interaction.user});

      console.log("editingreply")
      interaction.editReply({
        content: `Voici la liste de tes tournois`,
      })


    }).catch((err) => {
      interaction.editReply(err.message)
    });
  }

  private showServerTournaments = (interaction: CommandInteraction) => {
    if (interaction.guildId) {
      getSubscriptionsByServerId(interaction.guildId, ["tournament"]).then(async (subscriptions: ServerTournamentSubscribtion[]) => {
        console.log(subscriptions)
        SendTournamentsEmbedMessage.execute({tournaments: subscriptions.map((subscription) => subscription.tournament), channel: interaction.channel});
  
        interaction.editReply({
          content: `Voici la liste des tournois de ${interaction.guild?.name}`,
        })
  
      }).catch((err) => {
        interaction.editReply(err.message)
      });
    } else {
      interaction.editReply('Unexpected error')
    }
  }
}

export default TournamentList;
