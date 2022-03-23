import { Match } from "../models/Match";
import Tournament from "../models/Tournament";
import getTournamentMatchesUntil from "./getTournamentMatchesUntil";

const getTournamentTomorrowMatches = (tournament: Tournament): Match[] => {
    return getTournamentMatchesUntil(tournament, 1);
}

export default getTournamentTomorrowMatches;