import ServerTournamentSubscribtion from "../../models/ServerTournamentSubscription";
import Tournament from "../../models/Tournament";
import post from "../post";

const subscribeServerToTournament = async (serverId: string, tournamentId: string): Promise<ServerTournamentSubscribtion> => {
    return post('tournament-subscription/create', {serverId, tournamentId});
}

export default subscribeServerToTournament;
