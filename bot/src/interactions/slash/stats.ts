import { ApplicationCommandOptionType, CommandInteraction } from "discord.js";
import { Discord, Guard, Slash, SlashOption } from "discordx";
import isAdminOrDM from "../../decorators/isAdminOrDM";
import getTournamentStatisticsByName from "../../api/statistics/getTournamentStatisticsByName";
import SendTournamentStatistics from "../../useCases/statistics/SendTournamentStatistics";
import { autocompleteTournaments } from "../../utils/autocompleteTournaments";

@Discord()
abstract class Stats {

  @Slash({name: "stats", description: "Affiche les stats des matchs du jour"})
  @Guard(isAdminOrDM)
  public stats(@SlashOption({name: "tournament", description: "Nom du tournoi", autocomplete: autocompleteTournaments, type: ApplicationCommandOptionType.String, required: true}) tournamentName: string, interaction: CommandInteraction): void {
    getTournamentStatisticsByName({label: tournamentName, numberOfDays: 0}).then((statistics) => {
        interaction.editReply("Voici les statistiques d'aujourd'hui")
        SendTournamentStatistics.execute({channel: interaction.channel ? interaction.channel : interaction.user, statistics})
    }).catch((err) => {
        console.log(err.message)
        interaction.editReply(err.message)
    });
  }
}

export default Stats;