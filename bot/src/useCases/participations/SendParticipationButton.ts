import { CommandInteraction, MessageActionRow } from "discord.js";
import ParticipationButton from "../../components/buttons/ParticipationButton";
import Tournament from "../../models/Tournament";

class SendParticipationButton {
    public async execute (args: {tournament: Tournament, interaction: CommandInteraction}): Promise<void> {
        const button = new MessageActionRow()
        .addComponents(
            new ParticipationButton(args.tournament)
        );
        args.interaction.reply({content: args.tournament.label, components: [button]});
    }
}

export default new SendParticipationButton();