import Server from "../../models/Server";
import ServerTournamentSubscribtion from "../../models/ServerTournamentSubscription";
import put from "../put";

interface updateTournamentDTO {
    id: string
    label?: string
    description?: string
    externalTournamentId?: string
}

const updateTournament = async (serverTournamentSubscription: updateTournamentDTO): Promise<ServerTournamentSubscribtion> => {
    return put('tournament/edit', serverTournamentSubscription);
}

export default updateTournament;
