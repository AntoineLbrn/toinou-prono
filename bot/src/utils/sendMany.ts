import { Message, ActionRowBuilder, ComponentBuilder } from "discord.js";
import { MAX_BUTTONS_PER_MESSAGE } from "./consts";
import splitEvery from "./splitEvery";

const sendMany = async (args: {messages: ComponentBuilder[], channel: any}): Promise<Message[]> => {
    const messagesGrouped = splitEvery(args.messages, MAX_BUTTONS_PER_MESSAGE);
    return await messagesGrouped.map(async (messagePack: any) => {
        return await args.channel.send({components: [new ActionRowBuilder().addComponents(messagePack)]})
    });
}

export default sendMany;
