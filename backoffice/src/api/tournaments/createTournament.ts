import Tournament from "../../models/Tournament";
import post from "../post";

interface createTournamentDTO {
    label: string
    description: string
}

const createTournament = async (tournament: createTournamentDTO): Promise<Tournament> => {
    return post('tournament/create', tournament);
}

export default createTournament;
