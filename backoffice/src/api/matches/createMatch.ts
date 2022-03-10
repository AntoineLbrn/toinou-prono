import { Match } from "../../models/Match";
import post from "../post";

interface createMatchDTO {
    label: string
    description?: string
    manualVoteClosing: boolean
    tournamentId: string
    date: Date
}

const createMatch = async (match: createMatchDTO): Promise<Match> => {
    return post('match/create', match);
}

export default createMatch;
