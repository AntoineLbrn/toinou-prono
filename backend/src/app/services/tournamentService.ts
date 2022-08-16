import { Raw } from "typeorm";
import { Match } from "../entities/Match";
import { Server } from "../entities/Server";
import { ServerTournamentSubscribtion } from "../entities/ServerTournamentSubscribtion";
import { Tournament } from "../entities/Tournament";
import { User } from "../entities/User";
import { UserTournamentParticipation } from "../entities/UserTournamentParticipation";
import CustomError from "../errors/CustomError";
import Leaderboard from "../models/Leaderboard";
import LolesportEvent from "../models/LolesportEvent";
import lolesportService from "./lolesportService";
import matchService from "./matchService";
import serverService from "./serverService";

class tournamentService {

    async create(tournament: Partial<Tournament>): Promise<Tournament> {
        const newTournament = await Tournament.create(tournament);

        return newTournament.save();
    }

    async get(id: string, relations ?: string[]): Promise<Tournament> {
        return await Tournament.findOneOrFail(id, { relations: relations ? relations : ['participations', 'serversSubscriptions', 'matches', 'matches.bets', 'participations.participant'] });
    }

    async edit(tournament: Partial<Tournament>): Promise<Tournament> {
        const tournamentUpdated = await Tournament.findOne({
            where: { id: tournament.id },
        });
        if (!tournament)
            throw new Error('No tournament for the given ID');
        tournamentUpdated.label = tournament.label !== undefined ? tournament.label : tournamentUpdated.label;
        tournamentUpdated.description = tournament.description !== undefined ? tournament.description : tournamentUpdated.description;
        tournamentUpdated.externalTournamentId = tournament.externalTournamentId !== undefined ? tournament.externalTournamentId : tournamentUpdated.externalTournamentId;

        return tournamentUpdated.save();
    }

    async getRank(args: { user: User, tournamentId: string }): Promise<Number> {
        const tournament = await Tournament.findOneOrFail(args.tournamentId, { relations: ['participations', 'participations.participant'] });
        const ranking = this.computeRanking({ participations: tournament.participations });
        return ranking.findIndex((participation) => participation.participant.id === args.user.id) + 1;
    }

    async getByLabel(label: string, relations: string[] = []): Promise<Tournament> {
        const tournament = await Tournament.findOne({ where: { label: Raw(alias => `LOWER(${alias}) = LOWER('${label}')`) }, relations: ['matches', 'matches.bets', ...relations] });
        if (!tournament)
            throw new CustomError(3);
        return tournament;
    }

    async getLeaderboardByTournamentLabel(label: string): Promise<Leaderboard> {
        const tournament = await this.getByLabel(label, ['participations', 'participations.participant']);
        if (!tournament)
            throw new CustomError(3);
        return {
            tournament, leaderboardRows: this.computeRanking({ participations: tournament.participations }).slice(0, 10).map((participation, index) => {
                return {
                    rank: index + 1, user: participation.participant.tagUsedToBe, points: participation.points
                }
            })
        };
    }

    async fetchExternalMatches(id: string): Promise<Tournament> {
        console.log('*** FETCHING FROM LOLESPORT API ***')
        const tournament = await Tournament.findOne(id);
        if (!tournament)
            throw new CustomError(3);
        if (!tournament.externalTournamentId)
            throw new CustomError(9);

        const events = await lolesportService.getFuturEvents(tournament.externalTournamentId);
        const newMatches = [];
        for (const event of events) {
            newMatches.push(await matchService.createMatchFromLolesportEvent(event, tournament.id));
        };
        tournament.matches.push(...newMatches);
        return tournament.save();

    }

    async fetchExternalMatchesResults(id: string): Promise<Tournament> {
        console.log('*** FETCHING FROM LOLESPORT API ***')
        const tournament = await Tournament.findOne(id, { relations: ['matches', 'matches.bets'] });
        if (!tournament)
            throw new CustomError(3);
        if (!tournament.externalTournamentId)
            throw new CustomError(9);

        const events = await lolesportService.getPastEvents(tournament.externalTournamentId);
        for (const match of tournament.matches) {
            if (match.externalMatchId) {
                const lolesportEvent = events.find((event) => event.match.id === match.externalMatchId);
                if (lolesportEvent) matchService.validateBetFromExternalMatch(match, lolesportEvent.match)
            }
        }
        return tournament.save();

    }

    computeRanking(args: { participations: UserTournamentParticipation[] }): UserTournamentParticipation[] {
        return args.participations.sort((a, b) => b.points - a.points);
    }
}

export default new tournamentService();