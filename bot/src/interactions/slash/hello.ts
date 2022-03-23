import { CommandInteraction } from "discord.js";
import { Discord, Guild, Slash } from "discordx";

@Discord()
abstract class HelloWorld {
  @Slash("hello")
  public hello(interaction: CommandInteraction): void {
    interaction.reply(`Eh la bonne soirée ${interaction.user.username}`);
  }
}

export default HelloWorld;
