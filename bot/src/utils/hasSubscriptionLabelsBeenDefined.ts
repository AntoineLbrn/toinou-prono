import ServerTournamentSubscribtion from "../models/ServerTournamentSubscription";

const hasSubscriptionLabelsBeenDefined = (subscription: ServerTournamentSubscribtion): boolean => {
    return !!subscription.bettorChannelLabel && !!subscription.bettorRoleLabel;
}

export default hasSubscriptionLabelsBeenDefined;