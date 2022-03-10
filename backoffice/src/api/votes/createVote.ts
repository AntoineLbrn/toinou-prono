import { Bet } from "../../models/Bet";
import { Match } from "../../models/Match";
import { Vote } from "../../models/Vote";
import post from "../post";

interface createVoteDTO {
    betId: string
}

const createVote = async (bet: createVoteDTO): Promise<Vote> => {
    return post('vote/create', bet);
}

export default createVote;
