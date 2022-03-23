import { CommandInteraction } from "discord.js";
import { Discord, Guild, Slash } from "discordx";
import getSubscriptionsByServerId from "../../api/subscriptions/getSubscriptionsByServerId";
import getParticipationsByUserId from "../../api/participations/getParticipationsByUserId";
import { UserTournamentParticipation } from "../../models/UserTournamentParticipation";
import ServerTournamentSubscribtion from "../../models/ServerTournamentSubscription";
import SendTournamentsEmbedMessage from "../../useCases/tournaments/SendTournamentsEmbedMessage";
import TournamentEmbed from "../../components/embed/Tournament";

@Discord()
abstract class TournamentList {
  @Slash("tournament-list")
  public tournamentList(interaction: CommandInteraction): void {
    if (interaction.guildId) {
        this.showServerTournaments(interaction);  
    } else {
        this.showDMTournaments(interaction);
    }
  }

  private showDMTournaments = (interaction: CommandInteraction) => {
    getParticipationsByUserId(interaction.user.id).then(async (participations: UserTournamentParticipation[]) => {
      await interaction.deferReply();
      SendTournamentsEmbedMessage.execute({tournaments: participations.map((participation) => participation.tournament), channel: interaction.user});

      interaction.editReply({
        content: `Voici la liste de tes tournois`,
      })

    }).catch((err) => {
      interaction.reply(err.message)
    });
  }

  private showServerTournaments = (interaction: CommandInteraction) => {
    if (interaction.guildId) {
      getSubscriptionsByServerId(interaction.guildId).then(async (subscriptions: ServerTournamentSubscribtion[]) => {
        await interaction.deferReply();
        SendTournamentsEmbedMessage.execute({tournaments: subscriptions.map((subscription) => subscription.tournament), channel: interaction.channel});
  
        interaction.editReply({
          content: `Voici la liste des tournois de ${interaction.guild?.name}`,
        })
  
      }).catch((err) => {
        interaction.reply(err.message)
      });
    } else {
      interaction.reply('Unexpected error')
    }
  }
}

export default TournamentList;
