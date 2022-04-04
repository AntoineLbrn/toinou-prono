import Leaderboard from "../../models/Leaderboard";
import get from "../get";

const getLeaderboardByTournamentLabel = async (name: string): Promise<Leaderboard> => {
    return get(`leaderboard/label=${name}`).then((data) => data as Leaderboard);
}

export default getLeaderboardByTournamentLabel;
