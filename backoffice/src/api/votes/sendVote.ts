import { Bet } from "../../models/Bet";
import { Match } from "../../models/Match";
import { Vote } from "../../models/Vote";
import put from "../put";

interface sendVoteDTO {
    betId: string
}

const createVote = async (bet: sendVoteDTO): Promise<Vote> => {
    return put('vote', bet);
}

export default createVote;
