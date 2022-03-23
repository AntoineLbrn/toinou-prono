import { Server } from "../entities/Server";
import { ServerTournamentSubscribtion } from "../entities/ServerTournamentSubscribtion";
import { Tournament } from "../entities/Tournament";
import { User } from "../entities/User";
import { UserTournamentParticipation } from "../entities/UserTournamentParticipation";
import CustomError from "../errors/CustomError";
import serverService from "./serverService";

class tournamentService {
    
    async create(tournament: Partial<Tournament>): Promise<Tournament> {
        const newTournament = await Tournament.create(tournament);
        
        return newTournament.save();
    }

    async get(id: string): Promise<Tournament> {
        return await Tournament.findOneOrFail(id, {relations: ['participations', 'serversSubscriptions', 'matches', 'matches.bets', 'participations.participant']});
    }

    async edit(tournament: Partial<Tournament>): Promise<Tournament> {
        const tournamentUpdated = await Tournament.findOne({
            where: { id: tournament.id },
        });
        if (!tournament)
            throw new Error('No tournament for the given ID');
        tournamentUpdated.label = tournament.label !== undefined ? tournament.label : tournamentUpdated.label;
        tournamentUpdated.description = tournament.description !== undefined ? tournament.description : tournamentUpdated.description;
   
        return tournamentUpdated.save();
    }

    async getRank(args: {user: User, tournamentId: string}): Promise<Number> {
        const tournament = await Tournament.findOneOrFail(args.tournamentId, {relations: ['participations', 'participations.participant']});
        const ranking = this.computeRanking({participations: tournament.participations});
        return ranking.findIndex((participation) => participation.participant.id === args.user.id) + 1;
    }

    computeRanking(args: { participations: UserTournamentParticipation[] }): UserTournamentParticipation[] {
        return args.participations.sort((a,b) => b.points - a.points);
    }
}

export default new tournamentService();