import { UserTournamentParticipation } from "../../models/UserTournamentParticipation";
import get from "../get";

const getParticipationsByUserId = async (userId: string): Promise<UserTournamentParticipation[]> => {
    return get(`user-tournament-participation/discord-user-id=${userId}`).then((data) => data as UserTournamentParticipation[]);
}

export default getParticipationsByUserId;
