import ServerTournamentSubscribtion from "../models/ServerTournamentSubscription";

const isSubscriptionConfigured = (subscription: ServerTournamentSubscribtion): boolean => {
    return !!subscription.bettorRoleId && !! subscription.bettorChannelId;
}

export default isSubscriptionConfigured;