import { BetStatus } from "../models/Bet"

const betStatusAsColor = (status: BetStatus | undefined) => {
    switch (status) {
        case BetStatus.LOST: return 'red.300';
        case BetStatus.PENDING: return 'orange.200';
        case BetStatus.WON: return 'green.200';
        default: return 'orange.200'
    }
}

export default betStatusAsColor