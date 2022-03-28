import { CommandInteraction } from "discord.js";
import { GuardFunction } from "discordx";

const isNotDM: GuardFunction<CommandInteraction> = async (
    interaction,
    client,
    next
  ) => {
    if (!!interaction.guildId) {
        await next();
    } else {
        interaction.reply(`Tu ne peux pas utiliser cette commande en DM`);
    }
};

export default isNotDM;
