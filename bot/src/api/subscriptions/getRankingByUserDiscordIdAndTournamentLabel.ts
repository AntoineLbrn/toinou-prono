import get from "../get";
import Ranking from '../../models/Ranking';

const getRankingByDiscordUserIdAndTournamentLabel = async (args: {label: string, discordUserId: string}): Promise<Ranking> => {
    return get(`rank/tournamentLabel=${args.label}&discordUserId=${args.discordUserId}`).then((data) => data as Ranking);
}

export default getRankingByDiscordUserIdAndTournamentLabel;
