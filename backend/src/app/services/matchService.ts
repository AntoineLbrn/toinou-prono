import { DeleteResult, getRepository, UpdateResult } from "typeorm";
import { Bet, BetStatus } from "../entities/Bet";
import { Match } from "../entities/Match";
import { Server } from "../entities/Server";
import { ServerTournamentSubscribtion } from "../entities/ServerTournamentSubscribtion";
import { Tournament } from "../entities/Tournament";
import betService from "./betService";

class matchService {
    
    async create(label: string, description: string, date: Date, tournamentId: string, manualVoteClosing: boolean): Promise<Match> {
        const tournament = await Tournament.findOne(tournamentId);
        if (!tournament)
            throw new Error('No tournament found for the given ID');
        const newMatch = await Match.create({
            label,
            manualVoteClosing,
            description,
            date,
            tournament
        });
        
        return newMatch.save();
    }

    async edit(match: Partial<Match>): Promise<Match> {
        const matchUpdated = await Match.findOne({
            where: { id: match.id },
        });
        if (!match)
            throw new Error('No match for the given ID');
        matchUpdated.label = match.label !== undefined ? match.label : match.label;
        matchUpdated.bets = match.bets !== undefined ? match.bets : match.bets;
        matchUpdated.description = match.description !== undefined ? match.description : match.description;
        matchUpdated.isVoteClosed = match.isVoteClosed !== undefined ? match.isVoteClosed : match.isVoteClosed;
        matchUpdated.manualVoteClosing = match.manualVoteClosing !== undefined ? match.manualVoteClosing : match.manualVoteClosing;
   
        return matchUpdated.save();
    }

    async invalidateAllBetsExcept(matchId: string, betId: string): Promise<Match> {
        const match = await Match.findOne(matchId, {relations: ['bets']});
        if (!match)
            throw new Error ('No match found for the given ID');
            
        for (const bet of match.bets) 
            if (bet.id !== betId)
                await betService.edit({...bet, status: BetStatus.LOST})

        return match;
    }

    async delete(matchId: string): Promise<DeleteResult> {
        return Match.delete(matchId);
    }
}

export default new matchService();