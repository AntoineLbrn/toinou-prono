import { CommandInteraction, User } from "discord.js";
import { Discord, Slash } from "discordx";
import createUser from "../../api/users/createUser";

@Discord()
abstract class Start {
  @Slash("start", {description: 'Fais toi connaître de ToinouProno'})
  public hello(interaction: CommandInteraction): void {
    createUser({discordUserId: interaction.user.id, isSuperAdmin: false, tagUsedToBe: `${interaction.user.username}#${interaction.user.discriminator}`}).then(() => {
        interaction.reply(`Te voilà enregistré dans ma base de données :nerd:`);
    }).catch((error) => {
        interaction.reply(error.message);
    })
  }
}

export default Start;
