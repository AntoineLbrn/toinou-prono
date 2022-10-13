import { CommandInteraction } from "discord.js";
import { Discord, Guild, Slash } from "discordx";

@Discord()
abstract class HelloWorld {
  @Slash({name: "hello", description: "Say hello to Toinou-Prono"})
  public hello(interaction: CommandInteraction): void {
    interaction.editReply({ content: `Eh la bonne soirée ${interaction.user.username}`});
  }
}

export default HelloWorld;
