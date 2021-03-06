import { ButtonInteraction } from "discord.js";
import { Discord, ButtonComponent, Guard } from "discordx";
import isAdminOrDM from "../../decorators/isAdminOrDM";
import { Vote } from "../../models/Vote";
import sendVote from "../../api/votes/sendVote";

@Discord()
class BetButtonHandler {
    @ButtonComponent(new RegExp("^bet-button ."), )
    handle(interaction: ButtonInteraction) {
        interaction.deferUpdate();
        const betId = interaction.customId.split(' ')[1];
        sendVote({betId, discordUserId: interaction.user.id}).then(async (vote: Vote) => {
            interaction.user.send({
                content: `Vote bien enregistrĂ©: ${vote.bet.label} (${vote.match.label})`,
            });
        }).catch(async (err) => {
            interaction.user.send(err.message);
        });
    }
}