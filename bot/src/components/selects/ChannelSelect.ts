import { GuildChannelManager, MessageSelectMenu } from "discord.js";
import ServerTournamentSubscribtion from "../../models/ServerTournamentSubscription";

class ChannelSelect extends MessageSelectMenu {
    constructor(channels: GuildChannelManager, subscription: ServerTournamentSubscribtion) {
        const channelsAsOptions = channels.cache.map((channel) => {
            return {
                label: channel.name,
                value: channel.id
            }
        });
        super (
            new MessageSelectMenu()
            .setCustomId(`select-bettor-channel ${subscription.id}`)
            .setPlaceholder('Choisis le channel de pari')
            .addOptions(channelsAsOptions ? channelsAsOptions : []),
        )
    }
}
export default ChannelSelect;