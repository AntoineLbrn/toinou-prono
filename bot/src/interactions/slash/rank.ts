import { CommandInteraction } from "discord.js";
import { Discord, Guild, Slash, SlashOption } from "discordx";
import getRankingByUserDiscordIdAndTournamentLabel from "../../api/subscriptions/getRankingByUserDiscordIdAndTournamentLabel";

@Discord()
abstract class Rank {
    @Slash("rank", {description: 'Affiche ton rank pour une compétition'})
    public rank(@SlashOption("tournament", { description: "Nom du tournoi à consulter", required: true}) tournamentName: string, interaction: CommandInteraction): void {
        getRankingByUserDiscordIdAndTournamentLabel({discordUserId: interaction.user.id, label: tournamentName}).then((ranking) => {
            interaction.reply(`Tu es classé ${ranking.rank} : ${ranking.points} points`);
        }).catch((error) => {
            interaction.reply(error.message);
        });
    }
}

export default Rank;
