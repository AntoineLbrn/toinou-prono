import { getRepository, UpdateResult } from "typeorm";
import { Bet, BetStatus } from "../entities/Bet";
import { Match } from "../entities/Match";
import { Server } from "../entities/Server";
import { ServerTournamentSubscribtion } from "../entities/ServerTournamentSubscribtion";
import { Tournament } from "../entities/Tournament";
import { User } from "../entities/User";
import { UserTournamentParticipation } from "../entities/UserTournamentParticipation";
import { Vote } from "../entities/Vote";

class voteService {
    
    async create(createVoteArgs: {discordUserId: string, betId: string}): Promise<Vote> {
        const user = await User.findOne({where: {discordUserId: createVoteArgs.discordUserId}});
        if (!user)
            throw new Error('No User found for the given ID');

        const bet = await Bet.findOne(createVoteArgs.betId, {relations: ['match', 'match.tournament']});
        if (!bet)
            throw new Error('No Bet found for the given ID');

        const participation = await UserTournamentParticipation.findOne({where: {tournament: bet.match.tournament, participant: user}});
        if (!participation)
            throw new Error('You are not participating to this tournament yet');
        
        const newVote = await Vote.create({
            bet,
            participation
        });
        
        return newVote.save();
    }
}

export default new voteService();