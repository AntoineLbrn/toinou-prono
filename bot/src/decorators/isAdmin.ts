import { CommandInteraction } from "discord.js";
import { GuardFunction } from "discordx";

const isAdmin: GuardFunction<CommandInteraction> = async (
    interaction,
    client,
    next
  ) => {
    if (!interaction.memberPermissions) {
        interaction.reply(`Tu ne peux pas utiliser cette commande en DM`);
    } else if ((BigInt(interaction.memberPermissions.bitfield) & BigInt(0x8)) != BigInt(0x8)) {
        interaction.reply(`Tu n'as pas les droits pour utiliser cette commande (ratio)`);
    } else {
        await next();
    }
};

export default isAdmin;
