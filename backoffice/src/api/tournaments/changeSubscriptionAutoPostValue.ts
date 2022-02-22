import ServerTournamentSubscribtion from "../../models/ServerTournamentSubscription";
import put from "../put";

const changeSubscriptionAutoPostValue = async (subscriptionId: string, value: boolean): Promise<ServerTournamentSubscribtion> => {
    return put('tournament-subscription/edit', {id: subscriptionId, shouldAutoPostBets: value});
}

export default changeSubscriptionAutoPostValue;
