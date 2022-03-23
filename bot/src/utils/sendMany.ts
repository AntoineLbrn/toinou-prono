import { BaseMessageComponent, Message, MessageActionRow } from "discord.js";
import { MAX_BUTTONS_PER_MESSAGE } from "./consts";
import splitEvery from "./splitEvery";

const sendMany = async (args: {messages: BaseMessageComponent[], channel: any}): Promise<Message[]> => {
    const messagesGrouped = splitEvery(args.messages, MAX_BUTTONS_PER_MESSAGE);
    return await messagesGrouped.map(async (messagePack: any) => {
        return await args.channel.send({components: [new MessageActionRow().addComponents(messagePack)]})
    });
}

export default sendMany;
