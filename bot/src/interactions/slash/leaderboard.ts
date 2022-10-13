import { ApplicationCommandOptionType, CommandInteraction } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import LeaderboardEmbed from "../../components/embed/Leaderboard";
import getLeaderboardByTournamentLabel from "../../api/tournaments/getLeaderboardByTournamentLabel";
import LeaderboardModel from "../../models/Leaderboard";
import { autocompleteTournaments } from "../../utils/autocompleteTournaments";

@Discord()
abstract class Leaderboard {
    @Slash({name: "leaderboard", description: 'Affiche ton rank pour une compétition'})
    public rank(
        @SlashOption({name: "tournament", description: "Nom du tournoi à consulter", autocomplete: autocompleteTournaments, type: ApplicationCommandOptionType.String, required: true}) tournamentName: string,
        interaction: CommandInteraction,
    ): void {
        getLeaderboardByTournamentLabel(tournamentName).then((leaderboard: LeaderboardModel) => {
            interaction.editReply({content: 'voici le leaderboard', embeds: [new LeaderboardEmbed(leaderboard)]});
        }).catch((error) => {
            interaction.editReply(error.message);
        });
    }
}

export default Leaderboard;
