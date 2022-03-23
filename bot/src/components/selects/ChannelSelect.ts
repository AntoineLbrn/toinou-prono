import { GuildChannelManager, MessageSelectMenu } from "discord.js";

class ChannelSelect extends MessageSelectMenu {
    constructor(channels: GuildChannelManager) {
        const channelsAsOptions = channels.cache.map((channel) => {
            return {
                label: channel.name,
                value: channel.id
            }
        });
        super (
            new MessageSelectMenu()
            .setCustomId('select-bettor-channel')
            .setPlaceholder('Choisis le channel de pari')
            .addOptions(channelsAsOptions ? channelsAsOptions : []),
        )
    }
}
export default ChannelSelect;