import { Match } from "../../models/Match";
import put from "../put";


const closeVotes = async (matchId: string): Promise<Match> => {
    return put('match/edit', {id: matchId, isVoteClosed: true});
}

export default closeVotes;
