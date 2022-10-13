import { CommandInteraction } from "discord.js";
import { GuardFunction } from "discordx";

const isAdminOrDM: GuardFunction<CommandInteraction> = async (
    interaction,
    client,
    next
  ) => {
    if (interaction.memberPermissions && (BigInt(interaction.memberPermissions.bitfield) & BigInt(0x8)) != BigInt(0x8)) {
        interaction.editReply(`Tu n'as pas les droits pour utiliser cette commande (ratio)`);
    } else {
        await next();
    }
};

export default isAdminOrDM;
