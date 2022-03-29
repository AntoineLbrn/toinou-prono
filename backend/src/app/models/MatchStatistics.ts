import { Match } from "../entities/Match";
import BetStatistics from "./BetStatistics";

interface MatchStatistics {
    match: Match
    stats: BetStatistics[]
}

export default MatchStatistics;
