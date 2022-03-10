import ServerTournamentSubscribtion from "../../models/ServerTournamentSubscription";
import get from "../get";

const getSubscription = async (id: string): Promise<ServerTournamentSubscribtion> => {
    return get(`server-tournament-subscription/${id}`).then((data) => data as ServerTournamentSubscribtion);
}

export default getSubscription;
