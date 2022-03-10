import ServerTournamentSubscribtion from "../../models/ServerTournamentSubscription";
import { UserTournamentParticipation } from "../../models/UserTournamentParticipation";
import get from "../get";

const getRank = async (tournamentId: string): Promise<Number> => {
    return get(`rank/${tournamentId}`).then((data) => data as Number);
}

export default getRank;
