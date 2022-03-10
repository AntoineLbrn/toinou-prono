import { Bet, BetStatus } from "../../models/Bet";
import { Match } from "../../models/Match";
import put from "../put";

interface updateBetDTO {
    id: string
    label?: string
    description?: string
    discordReactionCode?: string
    status?: BetStatus
    match?: Match
}

const updateBet = async (bet: updateBetDTO): Promise<Bet> => {
    return put('bet/edit', bet);
}

export default updateBet;
