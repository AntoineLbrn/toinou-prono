import { ButtonInteraction } from "discord.js";
import { Discord, ButtonComponent, Guard } from "discordx";
import sendParticipation from "../../api/participations/sendParticipation";
import { UserTournamentParticipation } from "../../models/UserTournamentParticipation";

@Discord()
class ParticipationButtonHandler {
    @ButtonComponent(new RegExp("^participation-button ."), )
    handle(interaction: ButtonInteraction) {
        interaction.deferUpdate();

        const tournamentId = interaction.customId.split(' ')[1];
        sendParticipation({tournamentId, discordUserId: interaction.user.id}).then(async (participation: UserTournamentParticipation) => {

            interaction.user.send({
                content: `Inscription enregistrée pour le tournoi ${participation.tournament.label}`,
            });
        }).catch(async (err) => {
            interaction.user.send(err.message);
        });
    }
}