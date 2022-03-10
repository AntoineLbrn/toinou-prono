import ServerTournamentSubscribtion from "../../models/ServerTournamentSubscription";
import { UserTournamentParticipation } from "../../models/UserTournamentParticipation";
import get from "../get";

const getCurrentUserParticipations = async (args: {tournamentId: string}): Promise<UserTournamentParticipation> => {
    return get(`user-tournament-participation/${args.tournamentId}`).then((data) => data as UserTournamentParticipation);
}

export default getCurrentUserParticipations;
