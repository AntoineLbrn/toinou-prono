import { ButtonInteraction } from "discord.js";
import { Discord, ButtonComponent, Guard } from "discordx";
import getTournamentById from "../../api/tournaments/getTournamentById";
import SendTournamentLinkButton from "../../useCases/tournaments/SendTournamentLinkButton";
import isAdminOrDM from "../../decorators/isAdminOrDM";
import SendTournamentIncomingMatches from "../../useCases/matches/SendTournamentIncomingMatches";

@Discord()
class TournamentButtonHandler {
    @ButtonComponent(new RegExp("^tournament-button ."), )
    @Guard(isAdminOrDM)
    handle(interaction: ButtonInteraction) {
        const tournamentId = interaction.customId.split(' ')[1];
        const numberOfDays = interaction.customId.split(' ')[2];
        getTournamentById(tournamentId).then(async (tournament) => {
            await interaction.deferReply();
            interaction.channel?.send
            SendTournamentLinkButton.execute({tournament, channel: interaction.channel});
            SendTournamentIncomingMatches.execute({tournament, channel: interaction.channel, days: numberOfDays ? Number(numberOfDays) : 1});

            interaction.editReply({
                content: `Voici la liste des matchs des ${numberOfDays} prochains jours 😎`,
            });
        });
    }
}