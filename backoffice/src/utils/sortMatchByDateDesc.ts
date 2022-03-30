import { Match } from "../models/Match";

export const sortMatchByDateDesc = (match1: Match, match2: Match) => {
    return new Date(match2.date).getTime() - new Date(match1.date).getTime();
}