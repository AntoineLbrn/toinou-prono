import { ApplicationCommandOptionType, CommandInteraction, GuildMember, User } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import { autocompleteTournaments } from "../../utils/autocompleteTournaments";
import getRankingByUserDiscordIdAndTournamentLabel from "../../api/subscriptions/getRankingByUserDiscordIdAndTournamentLabel";

@Discord()
abstract class Rank {
    @Slash({name: "rank", description: 'Affiche ton rank pour une compétition'})
    public rank(
        @SlashOption({name: "tournament", description: "Nom du tournoi à consulter", autocomplete: autocompleteTournaments, type: ApplicationCommandOptionType.String, required: true}) tournamentName: string,
        @SlashOption({name: "user", description: "Utilisateur à consulter", type: ApplicationCommandOptionType.User, required: false}) member: GuildMember,
        interaction: CommandInteraction,
    ): void {
        getRankingByUserDiscordIdAndTournamentLabel({discordUserId: member ? member.id : interaction.user.id, label: tournamentName}).then((ranking) => {
            interaction.editReply(`${member ? member.user.username + ' est' : 'Tu es'} classé ${ranking.rank} : ${ranking.points} points`);
        }).catch((error) => {
            interaction.editReply(error.message);
        });
    }
}

export default Rank;
