import { getRepository, UpdateResult } from "typeorm";
import { Bet, BetStatus } from "../entities/Bet";
import { User } from "../entities/User";
import { UserTournamentParticipation } from "../entities/UserTournamentParticipation";
import { Vote } from "../entities/Vote";
import CustomError from "../errors/CustomError";

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
            throw new CustomError(2);
    

        if (bet.match.isMatchOver())
            throw new CustomError(1);
        
        const newVote = await Vote.create({
            bet,
            participation,
            match: bet.match
        });
        
        return newVote.save();
    }

    async editOrCreate(editVoteArgs: {discordUserId: string, betId: string}): Promise<Vote> {
        const user = await User.findOne({where: {discordUserId: editVoteArgs.discordUserId}});
        if (!user)
            throw new CustomError(6);

        const bet = await Bet.findOne(editVoteArgs.betId, {relations: ['match', 'match.tournament']});
        if (!bet)
            throw new Error('No Bet found for the given ID');

        const participation = await UserTournamentParticipation.findOne({where: {tournament: bet.match.tournament, participant: user}});
        if (!participation)
            throw new CustomError(2);
        
        if (bet.match.isMatchOver())
            throw new CustomError(1);


        let vote = await Vote.findOne({
            where: { match: bet.match, participation }, relations: ['match']
        });
        if (vote) {
            vote.bet = bet;
        } else {
            vote = await Vote.create({
                bet,
                participation,
                match: bet.match
            },);
        }
        return vote.save();
    }
}

export default new voteService();