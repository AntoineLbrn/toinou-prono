import { Message } from "discord.js";
import TournamentEmbed from "../../components/embed/Tournament";
import Tournament from "../../models/Tournament";

class SendTournamentsEmbedMessage {
    public async execute (args: {tournaments: Tournament[], channel: any}): Promise<Message[]> {
        const embeds = args.tournaments.map((tournament) => new TournamentEmbed(tournament));
        return await args.channel.send({embeds});
    }
}

export default new SendTournamentsEmbedMessage();