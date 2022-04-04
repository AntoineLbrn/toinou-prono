import isSubscriptionConfigured from "../../utils/isSubscriptionConfigured";
import ServerTournamentSubscribtion from "../../models/ServerTournamentSubscription";
import { Client } from "discordx";
import getAllSubscriptions from "../../api/subscriptions/getAllSubscriptions";
import { TextBasedChannel } from "discord.js";
import SendTournamentIncomingMatches from "./SendTournamentIncomingMatches";

class SendIncomingMatchesInAllServers {
    public async execute (client: Client): Promise<void> {
        getAllSubscriptions().then(async (subscriptions: ServerTournamentSubscribtion[]) => {
            for (const subscription of subscriptions) {
                if (isSubscriptionConfigured(subscription)) {
                    const channel = client.channels.cache.find((channel) => channel.id === subscription.bettorChannelId) as TextBasedChannel;
                    if (await SendTournamentIncomingMatches.execute({channel, days: 1, tournament: subscription.tournament, roleId: subscription.bettorRoleId, silentIfNoMatch: true})) {
                        await channel.send(`C'est l'heure de voter pour ${subscription.tournament.label} :D`).catch((error) => console.log(error));
                    };
                }
            }
        }).catch((error) => {
            console.log(error)
        });
    }
}


export default new SendIncomingMatchesInAllServers();