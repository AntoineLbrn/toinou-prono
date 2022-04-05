import { CommandInteraction, User } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import getRankingByUserDiscordIdAndTournamentLabel from "../../api/subscriptions/getRankingByUserDiscordIdAndTournamentLabel";

@Discord()
abstract class Rank {
    @Slash("rank", {description: 'Affiche ton rank pour une compétition'})
    public rank(
        @SlashOption("tournament", { description: "Nom du tournoi à consulter", required: true}) tournamentName: string,
        @SlashOption("user", { description: "Utilisateur à consulter", type: "USER", required: false}) user: User,
        interaction: CommandInteraction,
    ): void {
        getRankingByUserDiscordIdAndTournamentLabel({discordUserId: user ? user.id : interaction.user.id, label: tournamentName}).then((ranking) => {
            interaction.reply(`Tu es classé ${ranking.rank} : ${ranking.points} points`);
        }).catch((error) => {
            interaction.reply(error.message);
        });
    }
}

export default Rank;
