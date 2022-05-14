import { UserTournamentParticipation } from "../../models/UserTournamentParticipation";
import get from "../get";

const getParticipationsByUserId = async (userId: string, relations?: string[]): Promise<UserTournamentParticipation[]> => {
    return get(`user-tournament-participation/discord-user-id=${userId}${relations ? `?relations=${relations.join(',')}` : ''}`).then((data) => data as UserTournamentParticipation[]);
}

export default getParticipationsByUserId;
