import { Message } from "discord.js";
import getTournamentTomorrowMatches from "../../utils/getTournamentTomorrowMatches";
import Tournament from "../../models/Tournament";
import SendIncomingMatch from "./SendIncomingMatch";
import getTournamentMatchesUntil from "../../utils/getTournamentMatchesUntil";

class SendTournamentIncomingMatches {
    public async execute (args: {tournament: Tournament, channel: any, days: number}): Promise<boolean> {
        const matches = getTournamentMatchesUntil(args.tournament, args.days);
        if (!matches.length) {
            return args.channel.send("Pas de match pour aujourd'hui")
        } else {
            for (const match of matches) {
                await SendIncomingMatch.execute({match, channel: args.channel});
            }
            return true;
        }
    }
}


export default new SendTournamentIncomingMatches();