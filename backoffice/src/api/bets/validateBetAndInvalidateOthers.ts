import { Bet, BetStatus } from "../../models/Bet";
import { Match } from "../../models/Match";
import put from "../put";

const validateBetAndInvalidateOthers = async (id: string): Promise<Bet> => {
    return put('bet/validate-and-invalidate-others', {id});
}

export default validateBetAndInvalidateOthers;
