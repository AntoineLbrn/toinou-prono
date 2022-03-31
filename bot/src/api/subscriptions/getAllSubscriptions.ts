import ServerTournamentSubscribtion from "../../models/ServerTournamentSubscription";
import get from "../get";

const getAllSubscriptions = async (): Promise<ServerTournamentSubscribtion[]> => {
    return get(`subscriptions`).then((data) => data as ServerTournamentSubscribtion[]);
}

export default getAllSubscriptions;
