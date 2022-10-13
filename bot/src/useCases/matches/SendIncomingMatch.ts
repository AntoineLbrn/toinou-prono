import { Message } from "discord.js";
import { Match } from "../../models/Match";
import MatchEmbed from "../../components/embed/Match";
import SendMatchBetsButtons from "../bets/SendMatchBetsButtons";

class SendIncomingMatch {
    public async execute (args: {match: Match, channel: any}): Promise<Message[]> {
        await args.channel.send({embeds: [new MatchEmbed(args.match)]});
        return await SendMatchBetsButtons.execute({bets: args.match.bets, channel: args.channel});
    }
}


export default new SendIncomingMatch();