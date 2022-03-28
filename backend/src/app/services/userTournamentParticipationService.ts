import { Bet, BetStatus } from "../entities/Bet";
import { Match } from "../entities/Match";
import { Tournament } from "../entities/Tournament";
import { User } from "../entities/User";
import { UserTournamentParticipation } from "../entities/UserTournamentParticipation";
import CustomError from "../errors/CustomError";
import Ranking from "../models/Ranking";
import tournamentService from "./tournamentService";

class userTournamentParticipationService {
    async create(tournamentId: string, discordUserId: string): Promise<UserTournamentParticipation> {
        const tournament = await Tournament.findOne(tournamentId);
        if (!tournament)
            throw new Error('No tournament found for the given ID');

        const user = await User.findOne({where: {discordUserId}});
            if (!user)
                throw new Error('No user found for the given ID');

        const participation = await UserTournamentParticipation.findOne({where: {participant: user, tournament}});
        if (participation)
            throw new CustomError(7);

        const newParticipation = await UserTournamentParticipation.create({
            participant: user,
            tournament,
        });
        
        return newParticipation.save();
    }

    async get (getUserByDiscordUserId: {discordUserId: string}): Promise<UserTournamentParticipation[]> {
        const user = await User.findOne({where: {discordUserId: getUserByDiscordUserId.discordUserId}});
        if (!user)
            throw new Error('No user found for the given ID');

        return UserTournamentParticipation.find({where: {participant: user}, relations: ['tournament', 'tournament.matches', 'tournament.matches.bets', 'votes', 'votes.bet', 'votes.bet.match']});
    }

    async getByDiscordUserIdAndTournamentId(args: {discordUserId: string, tournamentId: string}): Promise<UserTournamentParticipation> {
        const user = await User.findOne({where: {discordUserId: args.discordUserId}});
        if (!user)
            throw new Error('No user found for the given ID');

        const tournament = await Tournament.findOne(args.tournamentId);
        if (!tournament)
            throw new Error('No tournament found for the given ID');

                
        return UserTournamentParticipation.findOne({where: {participant: user, tournament}, relations: ['votes', 'votes.bet', 'votes.bet.match']});
    }

    async getRank(args: {discordUserId: string, tournamentId: string}): Promise<Number> {
        const user = await User.findOne({where: {discordUserId: args.discordUserId}});
        if (!user)
            throw new Error('No user found for the given ID'); 

        return await tournamentService.getRank({user, tournamentId: args.tournamentId});
    }

    async getRankByTournamentLabelAndDiscordUserId(args: {discordUserId: string, tournamentLabel: string}): Promise<Ranking> {
        const user = await User.findOne({where: {discordUserId: args.discordUserId}});
        if (!user)
            throw new Error('No user found for the given ID');
        const tournament = await Tournament.findOne({where: {label: args.tournamentLabel}});
        if (!tournament)
            throw new CustomError(3); 
        const participation = await UserTournamentParticipation.findOne({where: {tournament, participant: user}})
        if (!participation)
            throw new CustomError(5); 

        const rank = await tournamentService.getRank({user, tournamentId: tournament.id})
        return {rank: rank.valueOf(), points: participation.points};
    }
}

export default new userTournamentParticipationService();