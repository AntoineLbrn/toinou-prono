import { Client } from "discordx";
import isSubscriptionConfigured from "../../utils/isSubscriptionConfigured";
import getAllSubscriptions from "../../api/subscriptions/getAllSubscriptions";
import ServerTournamentSubscribtion from "../../models/ServerTournamentSubscription";
import { TextBasedChannel } from "discord.js";
import getCurrentStatisticsByName from "../../api/statistics/getCurrentStatisticsByName";
import SendTournamentStatistics from "./SendTournamentStatistics";

class SendStatisticsOfCurrentMatches {
    public async execute (client: Client): Promise<void> {
        getAllSubscriptions().then(async (subscriptions: ServerTournamentSubscribtion[]) => {
            for (const subscription of subscriptions) {
                if (isSubscriptionConfigured(subscription)) {
                    const channel = client.channels.cache.find((channel) => channel.id === subscription.bettorChannelId) as TextBasedChannel;
                    if (channel) {
                        const statistics = await getCurrentStatisticsByName(subscription.tournament.label);
                        if (statistics.length) SendTournamentStatistics.execute({channel, statistics})
                    } 
                }
            }
        }).catch((error) => {
            console.log(error)
        });
    }
}


export default new SendStatisticsOfCurrentMatches();