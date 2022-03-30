import { ButtonInteraction } from "discord.js";
import { Discord, ButtonComponent } from "discordx";
import GiveRole from "../../useCases/users/GiveRole";
import sendParticipation from "../../api/participations/sendParticipation";
import { UserTournamentParticipation } from "../../models/UserTournamentParticipation";
import getSubscriptionByTournamentIdAndServerId from "../../api/subscriptions/getSubscriptionByTournamentIdAndServerId";

@Discord()
class ParticipationButtonHandler {
    @ButtonComponent(new RegExp("^participation-button ."), )
    handle(interaction: ButtonInteraction) {
        interaction.deferUpdate();

        const tournamentId = interaction.customId.split(' ')[1];
        if (interaction.guildId) {
            getSubscriptionByTournamentIdAndServerId(tournamentId, interaction.guildId).then((subscription) => {
                GiveRole.execute({member: interaction.member, role: subscription.bettorRoleId}).catch(() => interaction.user.send("Je n'ai pas pu te donner le rôle, demande à un admin de me donner des permissions"));
            }).catch((error) => interaction.user.send(error.message));
        }
        sendParticipation({tournamentId, discordUserId: interaction.user.id}).then(async (participation: UserTournamentParticipation) => {

            interaction.user.send({
                content: `Inscription enregistrée pour le tournoi ${participation.tournament.label}`,
            });
        }).catch(async (err) => {
            interaction.user.send(err.message);
        });
    }
}