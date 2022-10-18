export enum LolesportMatchOutcome {
    WIN = "win",
    LOSS = "loss"
}

interface LolesportTeam {
    name: string
    code: string
    image: string
    result: {
        outcome: LolesportMatchOutcome
        gameWins: number
    }
    record: {
        wins: number
        losses: number
    }
}

interface LolesportMatch {
    id: string
    flags: any[]
    teams: LolesportTeam[]
    strategy: {
        type: string,
        count: number
    }
}

export const isMatchBO5 = (match: LolesportMatch): boolean => {
    return match.strategy.type === "bestOf" && match.strategy.count === 5
}

export default LolesportMatch;
