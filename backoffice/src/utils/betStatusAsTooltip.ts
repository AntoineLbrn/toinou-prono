import { BetStatus } from "../models/Bet"

const betStatusAsTooltip = (status: BetStatus | undefined) => {
    switch (status) {
        case BetStatus.LOST: return 'Pari perdu';
        case BetStatus.PENDING: return 'Pari en cours de validation';
        case BetStatus.WON: return 'Pari gagné';
        default: return ''
    }
}

export default betStatusAsTooltip