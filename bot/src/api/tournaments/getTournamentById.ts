import ServerTournamentSubscribtion from "../../models/ServerTournamentSubscription";
import Tournament from "../../models/Tournament";
import get from "../get";

const getTournamentById = async (id: string): Promise<Tournament> => {
    return get(`tournament/${id}`).then((data) => data as Tournament);
}

export default getTournamentById;
