import { ComponentBuilder, Message } from "discord.js";
import TournamentButton from "../../components/buttons/TournamentButton";
import Tournament from "../../models/Tournament";
import sendMany from "../../utils/sendMany";

class SendTournamentButton {
    public async execute (args: {tournaments: Tournament[], channel: any, days: number}): Promise<Message[]> {
        const buttons = args.tournaments.map((tournament) => new TournamentButton(tournament, args.days));
        return await sendMany({messages: buttons, channel: args.channel});
    }
}

export default new SendTournamentButton();