import { Match } from "../models/Match";
import Tournament from "../models/Tournament";

const getTournamentMatchesUntil = (tournament: Tournament, days: number): Match[] => {
    const limitDate = new Date();
    const today = new Date();

    limitDate.setDate(limitDate.getDate() + days);
    return tournament.matches.filter((match) => {
        const matchDay = new Date(match.date);
        return isMatchInInterval(matchDay, today, limitDate) && isMatchClosed(match);
    });
}

const isMatchInInterval = (matchDate: Date, firstBound: Date, secondBound: Date): boolean => {
    return firstBound.valueOf() < matchDate.valueOf() && matchDate.valueOf() <= secondBound.valueOf();
}

const isMatchClosed = (match: Match): boolean => {
    return !match.manualVoteClosing || match.isVoteClosed
}

export default getTournamentMatchesUntil;