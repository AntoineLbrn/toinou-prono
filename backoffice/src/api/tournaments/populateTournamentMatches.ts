import Tournament from "../../models/Tournament";
import post from "../post";

const populateTournamentMatches = async (tournamentId: string): Promise<Tournament> => {
    return post(`tournament/populate/${tournamentId}`, {});
}

export default populateTournamentMatches;
