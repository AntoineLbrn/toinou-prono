import { Bet } from "../../models/Bet";
import { Match } from "../../models/Match";
import post from "../post";

interface createBetDTO {
    label: string
    matchId: string
}

const createBet = async (bet: createBetDTO): Promise<Bet> => {
    return post('bet/create', bet);
}

export default createBet;
