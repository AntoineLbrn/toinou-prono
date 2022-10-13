import { Match } from "../entities/Match";
import { Tournament } from "../entities/Tournament";
import CustomError from "../errors/CustomError";
import MatchStatistics from "../models/MatchStatistics";
import tournamentService from "./tournamentService";

class statisticsService {
    async getFromTournamentLabel(label: string, numberOfDays: number): Promise<MatchStatistics[]> {
        const tournament = tournamentService.getByLabel(label);
        if (!tournament)
            throw new CustomError(3);

        const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));
        const startDate = new Date(new Date().setDate(new Date().getDate() - numberOfDays));
        tomorrow.setHours(0,0,0,0);      
        startDate.setHours(0,0,0,0);

        const matches = await Match.createQueryBuilder('match')
            .leftJoin('match.tournament', 'tournament')
            .leftJoinAndSelect('match.bets', 'bets')
            .leftJoinAndSelect('bets.votes', 'votes')
            .leftJoinAndSelect('match.votes', 'matchVotes')
            .where('tournament.label = :label', {label})
            .andWhere('match.date > :startDate', {startDate})
            .andWhere('match.date < :tomorrow', {tomorrow})
            .getMany();

         return matches.map((match) => ({
            match,
            stats: match.bets.map((bet) => ({
                betId: bet.id,
                betLabel: bet.label,
                numberOfVotesForBet: bet.votes.length,
                percentage: (bet.votes.length / match.votes.length)*100
            }))
        }))
    }

    async getCurrentFromTournamentLabel(label: string): Promise<MatchStatistics[]> {
        const tournament = tournamentService.getByLabel(label);
        if (!tournament)
            throw new CustomError(3);
            
        const now = new Date();
        const nextHour = new Date();
        now.setTime(now.getTime() - 30)      
        nextHour.setTime(nextHour.getTime() + 30)      

        const matches = await Match.createQueryBuilder('match')
            .leftJoin('match.tournament', 'tournament')
            .leftJoinAndSelect('match.bets', 'bets')
            .leftJoinAndSelect('bets.votes', 'votes')
            .leftJoinAndSelect('match.votes', 'matchVotes')
            .where('tournament.label = :label', {label})
            .andWhere('match.date > :startDate', {now})
            .andWhere('match.date < :tomorrow', {nextHour})
            .getMany();

         return matches.map((match) => ({
            match,
            stats: match.bets.map((bet) => ({
                betId: bet.id,
                betLabel: bet.label,
                numberOfVotesForBet: bet.votes.length,
                percentage: (bet.votes.length / match.votes.length)*100
            }))
        }))
    }
}

export default new statisticsService();
