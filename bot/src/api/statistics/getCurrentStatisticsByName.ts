import MatchStatistics from "../../models/MatchStatistics";
import get from "../get";

const getCurrentStatisticsByName = async (name: string): Promise<MatchStatistics[]> => {
    return get(`statistics/now/tournamentLabel=${name}`).then((data) => data as MatchStatistics[]);
}

export default getCurrentStatisticsByName;
