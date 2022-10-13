import { GuildChannelManager, SelectMenuBuilder } from "discord.js";
import ServerTournamentSubscribtion from "../../models/ServerTournamentSubscription";

class ChannelSelect extends SelectMenuBuilder {
    constructor(channels: GuildChannelManager, subscription: ServerTournamentSubscribtion) {
        const channelsAsOptions = channels.cache.map((channel) => {
            return {
                label: channel.name,
                value: channel.id
            }
        });
        super (
            {custom_id: `select-bettor-channel ${subscription.id}`, placeholder: 'Choisis le channel de pari', options: channelsAsOptions ? channelsAsOptions : []}
        )
    }
}
export default ChannelSelect;