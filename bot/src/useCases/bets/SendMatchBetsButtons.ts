import { Message } from "discord.js";
import sendMany from "../../utils/sendMany";
import { Bet } from "../../models/Bet";
import BetButton from "../../components/buttons/BetButton";

class SendMatchBetsButtons {
    public async execute (args: {bets: Bet[], channel: any}): Promise<Message[]> {
        const buttons = args.bets.map((bet) => new BetButton(bet));
        return await sendMany({messages: buttons, channel: args.channel});    
    }
}


export default new SendMatchBetsButtons();