import { Match } from "../../models/Match";
import { UserTournamentParticipation } from "../../models/UserTournamentParticipation";
import post from "../post";

interface createUserTournamentParticipationDTO {
    tournamentId: string
}

const createUserTournamentParticipation = async (userTournamentParticipation: createUserTournamentParticipationDTO): Promise<UserTournamentParticipation> => {
    return post('user-tournament-participation/create', userTournamentParticipation);
}

export default createUserTournamentParticipation;
