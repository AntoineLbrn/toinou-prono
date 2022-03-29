import BetStatistics from "./BetStatistics";
import { Match } from "./Match";

interface MatchStatistics {
    match: Match
    stats: BetStatistics[]
}

export default MatchStatistics;
