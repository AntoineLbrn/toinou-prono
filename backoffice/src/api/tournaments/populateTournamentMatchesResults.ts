import Tournament from "../../models/Tournament";
import post from "../post";

const populateTournamentMatchesResults = async (tournamentId: string): Promise<Tournament> => {
    return post(`tournament/results/${tournamentId}`, {});
}

export default populateTournamentMatchesResults;
