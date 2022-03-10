import ServerTournamentSubscribtion from "../../models/ServerTournamentSubscription";
import { UserTournamentParticipation } from "../../models/UserTournamentParticipation";
import get from "../get";

const getCurrentUserParticipations = async (): Promise<UserTournamentParticipation[]> => {
    return get(`user-tournament-participation`).then((data) => data as UserTournamentParticipation[]);
}

export default getCurrentUserParticipations;
