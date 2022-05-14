import { UserTournamentParticipation } from "../../models/UserTournamentParticipation";
import get from "../get";

const getCurrentUserParticipations = async (relations?: string[]): Promise<UserTournamentParticipation[]> => {
    return get(`user-tournament-participation${relations ? `?relations=${relations.join(',')}` : ''}`).then((data) => data as UserTournamentParticipation[]);
}

export default getCurrentUserParticipations;
