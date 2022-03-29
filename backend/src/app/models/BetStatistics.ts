import { Bet } from "../entities/Bet"

interface BetStatistics {
    betId: string,
    betLabel: string,
    numberOfVotesForBet: number,
    percentage: number
}

export default BetStatistics;
