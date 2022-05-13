import { DeleteResult, getRepository, UpdateResult } from "typeorm";
import { Bet, BetStatus } from "../entities/Bet";
import { Match } from "../entities/Match";
import { Server } from "../entities/Server";
import { ServerTournamentSubscribtion } from "../entities/ServerTournamentSubscribtion";
import { Tournament } from "../entities/Tournament";
import LolesportEvent from "../models/LolesportEvent";
import LolesportMatch, { LolesportMatchOutcome } from "../models/LolesportMatch";
import betService from "./betService";

class matchService {
    
    async create(label: string, description: string, date: Date, tournamentId: string, manualVoteClosing: boolean, externalMatchId?: string): Promise<Match> {
        const tournament = await Tournament.findOne(tournamentId);
        if (!tournament)
            throw new Error('No tournament found for the given ID');
        const newMatch = await Match.create({
            label,
            manualVoteClosing,
            description,
            date,
            tournament,
            externalMatchId
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

    async createMatchFromLolesportEvent(event: LolesportEvent, tournamentId: string): Promise<Match> {
        const label = `${event.match.teams[0].name} vs ${event.match.teams[1].name}`;
        const description = `${event.type} - ${event.blockName} - ${event.league.name}`;
        const date = new Date(event.startTime);
        console.log(date)
        const match = await this.create(label, description, date, tournamentId, false, event.match.id)
        await betService.createBetsFromLolesportEvent(event, match.id);

        return match.save();
    }

    async validateBetFromExternalMatch(match: Match, externalMatch: LolesportMatch): Promise<Match> {
        const winner = externalMatch.teams.find((team) => team.result.outcome === LolesportMatchOutcome.WIN).code;
        const wonBet = match.bets.find((bet) => bet.label === winner);
        betService.edit({...wonBet, status: BetStatus.WON});
        this.invalidateAllBetsExcept(match.id, wonBet.id);
        return match.save();
    }
}

export default new matchService();