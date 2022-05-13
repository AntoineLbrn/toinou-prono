import { DeleteResult } from "typeorm";
import { Bet, BetStatus } from "../entities/Bet";
import { Match } from "../entities/Match";
import LolesportEvent from "../models/LolesportEvent";

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

    async delete(id: string): Promise<DeleteResult> {
        return Bet.delete(id);
    }

    async createBetsFromLolesportEvent(event: LolesportEvent, matchId: string): Promise<Bet[]> {
        const label1 = `${event.match.teams[0].code}`;
        const label2 = `${event.match.teams[1].code}`;
        const description1 = `${event.match.teams[0].name}`;
        const description2 = `${event.match.teams[1].name}`;
        
        const bet1 = await this.create(label1, matchId, description1, BetStatus.PENDING);
        const bet2 = await this.create(label2, matchId, description2, BetStatus.PENDING);
        return [bet1, bet2];
    }
}

export default new betService();