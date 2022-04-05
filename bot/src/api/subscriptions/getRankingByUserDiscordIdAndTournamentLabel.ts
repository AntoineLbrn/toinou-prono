import get from "../get";
import Ranking from '../../models/Ranking';
import ApiError from "../errors/ApiError";

const getRankingByDiscordUserIdAndTournamentLabel = async (args: {label: string, discordUserId: string}): Promise<Ranking> => {
    return get(`rank/tournamentLabel=${args.label}&discordUserId=${args.discordUserId}`).then((data) => data as Ranking).catch((error: ApiError) => {
        if (error.code === '6') throw new ApiError('Utilisateur inconnu', error.code);
        if (error.code === '5') throw new ApiError('Cet utilisateur ne participe pas au tournoi', error.code);
        throw error;
    });
}

export default getRankingByDiscordUserIdAndTournamentLabel;
