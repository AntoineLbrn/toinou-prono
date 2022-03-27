import { GuildBasedChannel, GuildChannelManager } from "discord.js";

const getGuildChannelFromId = (bettorChannelId: string, channels: GuildChannelManager): GuildBasedChannel | undefined => {
    return channels.cache.find((channel) => channel.id === bettorChannelId);
}

export default getGuildChannelFromId;
