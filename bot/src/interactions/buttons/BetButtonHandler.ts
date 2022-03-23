import { ButtonInteraction } from "discord.js";
import { Discord, ButtonComponent, Guard } from "discordx";
import isAdminOrDM from "../../decorators/isAdminOrDM";
import { Vote } from "../../models/Vote";
import sendVote from "../../api/votes/sendVote";

@Discord()
class BetButtonHandler {
    @ButtonComponent(new RegExp("^bet-button ."), )
    @Guard(isAdminOrDM)
    handle(interaction: ButtonInteraction) {
        const betId = interaction.customId.split(' ')[1];
        sendVote({betId, discordUserId: interaction.user.id}).then(async (vote: Vote) => {
            await interaction.deferReply();
            interaction.editReply({
                content: `Vote bien enregistré: ${vote.bet.label}`,
            });
        }).catch(async (err) => {
            await interaction.deferReply();
            interaction.editReply(err.message);
        });
    }
}