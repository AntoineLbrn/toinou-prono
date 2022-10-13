import { Message, ActionRowBuilder  } from "discord.js";
import TournamentLinkButton from "../../components/buttons/TournamentLinkButton";
import Tournament from "../../models/Tournament";

class SendTournamentLinkButton {
    public async execute (args: {tournament: Tournament, channel: any}): Promise<Message> {
        const button = new TournamentLinkButton(args.tournament);
        return args.channel.send({components: [new ActionRowBuilder().addComponents(button)]});
    }
}


export default new SendTournamentLinkButton();