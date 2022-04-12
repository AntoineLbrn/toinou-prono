import { CommandInteraction, GuildMember, User } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import { autocompleteTournaments } from "../../utils/autocompleteTournaments";
import getRankingByUserDiscordIdAndTournamentLabel from "../../api/subscriptions/getRankingByUserDiscordIdAndTournamentLabel";

@Discord()
abstract class Rank {
    @Slash("rank", {description: 'Affiche ton rank pour une compétition'})
    public rank(
        @SlashOption("tournament", { description: "Nom du tournoi à consulter", autocomplete: autocompleteTournaments, type: "STRING", required: true}) tournamentName: string,
        @SlashOption("user", { description: "Utilisateur à consulter", type: "USER", required: false}) member: GuildMember,
        interaction: CommandInteraction,
    ): void {
        getRankingByUserDiscordIdAndTournamentLabel({discordUserId: member ? member.id : interaction.user.id, label: tournamentName}).then((ranking) => {
            interaction.reply(`${member ? member.user.username + ' est' : 'Tu es'} classé ${ranking.rank} : ${ranking.points} points`);
        }).catch((error) => {
            interaction.reply(error.message);
        });
    }
}

export default Rank;
