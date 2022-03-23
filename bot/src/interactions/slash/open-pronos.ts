import { CommandInteraction } from "discord.js";
import { Discord, Guard, Slash, SlashOption } from "discordx";
import ServerTournamentSubscribtion from "../../models/ServerTournamentSubscription";
import getSubscriptionsByServerId from "../../api/subscriptions/getSubscriptionsByServerId";
import isAdminOrDM from "../../decorators/isAdminOrDM";
import SendTournamentsButtons from "../../useCases/tournaments/SendTournamentsButtons";
import { UserTournamentParticipation } from "../../models/UserTournamentParticipation";
import getParticipationsByUserId from "../../api/participations/getParticipationsByUserId";

@Discord()
abstract class OpenPronos {

  @Slash("open-pronos", {description: 'Affiche les prochains pronostics'})
  @Guard(isAdminOrDM)
  public openPronos(@SlashOption("n", { description: "nombre de prochains jours à consulter", required: false}) days: number, interaction: CommandInteraction): void {
    if (interaction.guildId) {
      this.openServerPronos(interaction, days ? days : 1);  
    } else {
      this.openDMPronos(interaction, days ? days : 1);
    }
  }

  private openDMPronos = (interaction: CommandInteraction, days: number) => {
    getParticipationsByUserId(interaction.user.id).then(async (participations: UserTournamentParticipation[]) => {
      await interaction.deferReply();
      SendTournamentsButtons.execute({tournaments: participations.map((participation) => participation.tournament), channel: interaction.user, days});

      interaction.editReply({
        content: "Cliquez sur le tournoi à afficher",
      })

    }).catch((err) => {
      interaction.reply(err.message)
    });
  }

  private openServerPronos = (interaction: CommandInteraction, days: number) => {

    // Should not fail, since we checked admin before
    if (interaction.guildId) {
      getSubscriptionsByServerId(interaction.guildId).then(async (subscriptions: ServerTournamentSubscribtion[]) => {
        await interaction.deferReply();
        SendTournamentsButtons.execute({tournaments: subscriptions.map((subscription) => subscription.tournament), channel: interaction.channel, days});
  
        interaction.editReply({
          content: "Cliquez sur le tournoi à afficher",
        })
  
      }).catch((err) => {
        interaction.reply(err.message)
      });
    } else {
      interaction.reply('Unexpected error')
    }
  }
}

export default OpenPronos;