import { Bet, BetStatus } from "../entities/Bet";
import { Match } from "../entities/Match";

class betService {
    
    async create(label: string, matchId: string, description: string, status: BetStatus): Promise<Bet> {
        const match = await Match.findOne(matchId, {relations: ['bets']});
        if (!match)
            throw new Error('No match found for the given ID');
        const newBet = await Bet.create({
            label,
            match,
            description,
            discordReactionCode: match.bets.length,
            status,
        });
        
        return newBet.save();
    }

    async get(id: string): Promise<Bet> {
        return Bet.findOne(id, {relations: ['match']});
    }

    async edit(bet: Partial<Bet>): Promise<Bet> {
        const betUpdated = await Bet.findOne({
            where: { id: bet.id },
        });
        if (!bet)
            throw new Error('No Bet for the given ID');
        betUpdated.label = bet.label !== undefined ? bet.label : betUpdated.label;
        betUpdated.description = bet.description !== undefined ? bet.description : betUpdated.description;
        betUpdated.discordReactionCode = bet.discordReactionCode !== undefined ? bet.discordReactionCode : betUpdated.discordReactionCode;
        betUpdated.match = bet.match !== undefined ? bet.match : betUpdated.match;
        betUpdated.status = bet.status !== undefined ? bet.status : betUpdated.status;
   
        return betUpdated.save();
    }
}

export default new betService();