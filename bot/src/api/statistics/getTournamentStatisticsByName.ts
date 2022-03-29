import MatchStatistics from "../../models/MatchStatistics";
import get from "../get";

const getTournamentStatisticsByName = async (args: {label: string, numberOfDays: number}): Promise<MatchStatistics[]> => {
    return get(`statistics/tournamentLabel=${args.label}&numberOfDays=${args.numberOfDays}`).then((data) => data as MatchStatistics[]);
}

export default getTournamentStatisticsByName;
