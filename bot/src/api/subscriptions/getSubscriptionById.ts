import ServerTournamentSubscribtion from "../../models/ServerTournamentSubscription";
import get from "../get";

const getSubscriptionById = async (id: string): Promise<ServerTournamentSubscribtion> => {
    return get(`subscription/${id}`).then((data) => data as ServerTournamentSubscribtion);
}

export default getSubscriptionById;
